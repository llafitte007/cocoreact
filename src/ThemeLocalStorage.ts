/* eslint-disable no-unused-vars */
import { IThemeStorage } from "./components/Theme/types";

export default class ThemeLocalStorage implements IThemeStorage {
	_key: string;

	constructor(key: string) {
		this._key = key;
	}

	public get() {
		const value = localStorage.getItem(this._key);
		return value ?? undefined;
	}

	public set(themeName: string) {
		localStorage.setItem(this._key, themeName);
	}
}
