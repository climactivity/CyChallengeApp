import { matchdata, matchstatus } from '$lib/stores/context';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Client, Session, WebSocketAdapterText, type Match, type RpcResponse, type WriteStorageObject } from '@heroiclabs/nakama-js';
import { writable } from 'svelte/store';
import { v4 } from 'uuid';

let deviceId: string;
let reconnectHandle

export const HEARTBEAT_INTERVAL = 2000 /* ms */

export const ssr = false;
export let session: Session;
export const nkReady = writable(false);

export const hasError = writable(null);

// console.log('connecting to nakama with settings:', JSON.stringify({
//     host: import.meta.env.VITE_NAKAMA_HOST,
//     port: import.meta.env.VITE_NAKAMA_PORT,
//     useSSL: import.meta.env.VITE_NAKAMA_USE_SSL
// }));


export let client = new Client(
    import.meta.env.VITE_NAKAMA_CLIENT_API_KEY,
    import.meta.env.VITE_NAKAMA_HOST,
    import.meta.env.VITE_NAKAMA_PORT,
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    7000,
    true
);

export let socket = client.createSocket(
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    false,
    new WebSocketAdapterText()
);


/**
 * Gets the native device id from @capacitor/device
 * polyfills with a random (local stoarge backed) id on browsers  
 * @returns a uuid for the device
 */
export const getDeviceID = async () => {
    if (Capacitor.isNativePlatform()) {
        let capId =  await Device.getId()
        return capId.uuid
    }

    let lsId = await localStorage.getItem('NK_DEVICE_ID');
    // console.log("DEVICE_ID", lsId)
    if (!lsId) {
        lsId = v4();
        await localStorage.setItem('NK_DEVICE_ID', lsId);
    }
    return lsId

}


export const init = async () => {
    try {
        deviceId = await getDeviceID();

        session = await createSession();
        await connectSocket(session);
    
        if (reconnectHandle) {
            clearInterval(reconnectHandle)
        }

        nkReady.set(true);
        // console.log(session.token);
        hasError.set(null);

        return session;
    
    } catch (error) {
        console.log(error)
        onIsDisconnected()
    }
    return null
};

export const createSession = async () => {
    var create = true;
    try {
        let session = await client.authenticateDevice(deviceId, create, deviceId);
        console.info(`NK: Successfully authenticated @ ${import.meta.env.VITE_NAKAMA_HOST}:${import.meta.env.VITE_NAKAMA_PORT}`);
        return session;
    
    } catch (error) {
        console.log("couldn't create session!", error)
        hasError.set({
            error: "Keine Verbindung",
            description: "Die App verbindet sich automatisch neu, wenn eine Netzwerkverbindung hergestellt werden kann"
        });

        return null
    }
};

export const connectSocket = async (session) => {
    var appearOnline = true;

    let deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await socket.connect(session, appearOnline);
    return socket;
};


const onIsDisconnected = () => {
    setTimeout( async () => {
        const conntectionState = await init();
        if (conntectionState == null) {

        }
    }, HEARTBEAT_INTERVAL)
}

socket.ondisconnect = (e) => {
    console.log('connection to gameserver lost!');
    nkReady.set(false);

    reconnectHandle = setInterval(() => {
        console.log('attempting to reconnect');
        hasError.set({
            error: "Keine Verbindung",
            description: "Die App verbindet sich automatisch neu, wenn eine Netzwerkverbindung hergestellt werden kann"
        });
        init();
    }, 3000);
};

let matchId

socket.onmatchmakermatched = async (matched) => {
    matchId = matched.match_id
    const match: Match = await socket.joinMatch(matched.match_id, matched.token);
    matchstatus.set(match);
    console.log(match);
    // goto('/match');
};

export enum OpCode {
    server_match_end = 1,
    server_presence_ready = 2,
    server_match_started = 3,
    server_start_questions = 4,
    server_question_timeleft = 5,
    server_question_timeout = 6,
    server_show_result = 7,
    server_show_next_question = 8,
    server_show_match_summary = 9,
    server_match_result = 10,
    server_ack_answer = 101,
    client_set_answer = 100,
    client_set_ready = 200,
}

socket.onmatchdata = (matchData) => {
    console.log('received match data', matchData);

    matchdata.set(matchData);

    switch (matchData.op_code) {
        case OpCode.server_match_end:
            console.log('Match ended');
            break;
        case OpCode.server_show_next_question: {
            console.log('Goto next question');
            break;
        }
        default:
            // console.log('Unsupported op code');
            break;
    }
};

export const sendMatchData = (opcode, data = null, presence = null) => {
    socket.sendMatchState(matchId, opcode, data, presence)
}

/**
 * gather stats on app usage or snitch on errors
 * @param event the type of message i.e. "challenge-accept" 
 * @param data the data to save 
 * @param contextId optional id if analytics belong to a named context like a multiplayer match
 */
export const sendAnalytics = async (event: string, data: any, contextId?: string) => {

    let writeObjects: WriteStorageObject[] = [{
        collection: 'client_telemetry',
        key: `${event}${contextId ? `_ctx:${contextId}` : ''}_evId:${v4()}`,
        permission_read: 0,
        permission_write: 0,
        value: {
            event,
            device: deviceId,
            data,
            contextId,
        }
    }];

    try {
        await client.writeStorageObjects(session, writeObjects)
    } catch (e) {
        console.error(e);
    }

}

/**
 * Make nakama rpcs! 
 * Now with 100% less manual error checking 
 * @param rpc the rpc id (check docs and/or api explorer in dashboard)
 * @param payload a pojo containing parameters for the rpc
 * @returns a message id or the response as object
 */
export const makeRpc = async (rpc, payload) : Promise<RpcResponse> => {
    let isConnected = false
     nkReady.update(state => {
        isConnected = state
        return state;
    }) 

    if (!isConnected) {
        return Promise.reject("No connection to gameserver!")
    }

    const response = await client.rpc(session, rpc, payload)
    .catch(error => {
        console.log("RPC failed:", error)
        return Promise.reject(error.statusText ?? error.payload ?? error ?? "Internal server error")
    })

    console.log(`RPC ${rpc} response:` , JSON.stringify(response))
    return response

}

/**
 * Used in storage engine read/list calls to prevent attempted loads before connection 
 * to gameserver is made, use with caution
 * resolves instantly if connection is already established when called 
*/
export const connectGuard = async () : Promise<void> => {
    if (session) return Promise.resolve(); 
    let promiseResolve, promiseReject;

    let promise: Promise<void> = new Promise(function(resolve, reject){
        promiseResolve = resolve;
        promiseReject = reject;
    });

    nkReady.subscribe((ready) => {
        if (ready){
            promiseResolve();
        }
    })

    return promise
}