export interface IThemeStorage {
	get: () => string | undefined;
	set: (themeName: string) => void;
}
