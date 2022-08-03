import { client, session } from '$lib/client';
import type { StorageObject, StorageObjects, WriteStorageObject } from '@heroiclabs/nakama-js';
import type { ApiReadStorageObjectsRequest } from '@heroiclabs/nakama-js/dist/api.gen';

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
			...obj
		}))
	};
	try {
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
	// pass along errors
	if (result instanceof Error) return result;
	// return null if no object is found
	if (result.objects.length === 0) return null;
	// return the object if it is found
	return result.objects[0];
};

const listStorage = async (collection: string, cursor?: string, limit?: number) => {
	// TODO: maybe make pagination more explicit
	return await client.listStorageObjects(session, collection, cursor, limit);
};

export { writeStorage, writeManyStorage, readStorage, readManyStorage, listStorage };
