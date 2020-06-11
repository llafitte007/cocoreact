/* eslint-disable no-unused-vars */
import { IThemeStorage } from "./components/Theme/types";

export default class ThemeStorage implements IThemeStorage {
	_key: string;
	_storage: Storage;

	constructor(key: string, storage: Storage) {
		this._key = key;
		this._storage = storage;
	}

	public get() {
		const value = this._storage.getItem(this._key);
		return value ?? undefined;
	}

	public set(themeName: string) {
		this._storage.setItem(this._key, themeName);
	}
}
