import { Client, WebSocketAdapterText, Session, type Match, type WriteStorageObject } from '@heroiclabs/nakama-js';
import { v4 } from 'uuid';
import { writable } from 'svelte/store';
import { matchdata, matchstatus } from '$lib/stores/context';
import { goto } from '$app/navigation';
import { rewardStore } from './stores/reward-store';

export const ssr = false;
console.log('connecting to nakama with settings:', JSON.stringify({
    host: import.meta.env.VITE_NAKAMA_HOST,
    port: import.meta.env.VITE_NAKAMA_PORT,
    useSSL: import.meta.env.VITE_NAKAMA_USE_SSL
}));
export let client = new Client(
    import.meta.env.VITE_NAKAMA_CLIENT_API_KEY,
    import.meta.env.VITE_NAKAMA_HOST,
    import.meta.env.VITE_NAKAMA_PORT,
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    3000,
    true
);
let deviceId: string;
export let session: Session;
let reconnectHandle
export let socket = client.createSocket(
    import.meta.env.VITE_NAKAMA_USE_SSL === 'true',
    false,
    new WebSocketAdapterText()
);
export const nkReady = writable(false);
export const init = async () => {
    if (reconnectHandle) {
        clearInterval(reconnectHandle)
    }
    deviceId = await localStorage.getItem('NK_DEVICE_ID');
    if (!deviceId) {
        let deviceId = v4();
        await localStorage.setItem('NK_DEVICE_ID', deviceId);
    }
    session = await createSession();
    await connectSocket(session);

    nkReady.set(true);
    console.log(session.token);
    return session;
};

export const createSession = async () => {
    var create = true;
    let session = await client.authenticateDevice(deviceId, create, deviceId);
    console.info('Successfully authenticated:', session);
    return session;
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

socket.ondisconnect = (e) => {
    console.log('connection to gameserver lost!');
    nkReady.set(false);

    reconnectHandle = setInterval(() => {
        console.log('attempting to reconnect');
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

export const makeRpc = async (rpc, payload) => {
    let isConnected = false
     nkReady.update(state => {
        isConnected = state
        return state;
    }) 

    if (!isConnected) {
        return Promise.reject("No connection to gameserver!")
    }

    await client.rpc(session, rpc, payload).then((response) => {
        console.log("RPC:", response)
        return Promise.resolve(response)
    }
    ).catch(error => {
        console.log("RPC failed:", error)

        return Promise.reject(error.statusText ?? error.payload ?? error ?? "Internal server error")
    })
}

export const getSessionSafe = async () => {
    if (session) return session; 
    let promiseResolve, promiseReject;

    let promise = new Promise(function(resolve, reject){
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