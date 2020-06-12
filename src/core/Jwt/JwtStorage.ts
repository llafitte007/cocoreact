/* eslint-disable no-unused-vars */
import { IJwtStorage } from "./IJwtStorage";

export default class JwtStorage implements IJwtStorage {
	_storage: Storage;
	_key: string;

	constructor(key: string, storage: Storage) {
		this._storage = storage;
		this._key = key;
	}

	get = () => {
		return this._storage.getItem(this._key);
	};

	set = (token: string) => {
		this._storage.setItem(this._key, token);
	};

	remove = () => {
		this._storage.removeItem(this._key);
	};
}
