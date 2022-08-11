import { client, session } from '$lib/client';
import type { StorageObject, StorageObjects, WriteStorageObject } from '@heroiclabs/nakama-js';
import type {
	ApiDeleteStorageObjectsRequest,
	ApiReadStorageObjectsRequest
} from '@heroiclabs/nakama-js/dist/api.gen';

const writeManyStorage = async (
	collection: string,
	values: { key: string; value: any; version?: string }[],
	{ permission_read = 1, permission_write = 1 }
) => {
	const storageWriteRequests: WriteStorageObject[] = values.map((obj) => ({
		collection,
		...obj,
		version: obj.version ?? '*',
		permission_read,
		permission_write
	}));

	try {
		return await client.writeStorageObjects(session, storageWriteRequests);
	} catch (e) {
		console.error(e);
		return e;
	}
};

const writeStorage = async (
	collection: string,
	key: string,
	value: any,
	version?: string,
	permission_read = 1,
	permission_write = 1
) => {
	return await writeManyStorage(collection, [{ key, value, version }], {
		permission_read,
		permission_write
	});
};

const readManyStorage = async (
	ids: { collection?: string; key? }[]
): Promise<StorageObjects | Error> => {
	const storageReadRequests: ApiReadStorageObjectsRequest = {
		object_ids: ids.map((obj) => ({
			...obj,
			user_id: session.user_id
		}))
	};
	try {
		// console.log('readManyStorage', storageReadRequests);

		return await client.readStorageObjects(session, storageReadRequests);
	} catch (e) {
		console.error(e);
		return e;
	}
};
const readStorage = async (
	collection: string,
	key: string
): Promise<StorageObject | Error | null> => {
	const result = await readManyStorage([{ collection, key }]);
	// console.log('readStorage', collection, key, result);
	// pass along errors
	if (result instanceof Error) return result;
	// return null if no object is found
	if (result.objects.length === 0) return null;
	// return the object if it is found
	return result.objects[0];
};

const listStorage = async (collection: string, cursor?: string, limit: number = 100) => {
	// TODO: maybe make pagination more explicit
	// console.log('listStorage', session, collection, limit, cursor);
	return await client.listStorageObjects(session, collection, session.user_id, limit, cursor);
};

const dropStorage = async (collection: string, key: string) => {
	let currentValue = await readStorage(collection, key);
	if (currentValue instanceof Error) throw currentValue;
	if (currentValue === null) return true;
	const result = await client.deleteStorageObjects(session, {
		object_ids: [
			{
				collection,
				key,
				version: currentValue.version
			}
		]
	});
	return result;
};
export { writeStorage, writeManyStorage, readStorage, readManyStorage, listStorage, dropStorage };
