export interface IJwtStorage {
	get: () => string | null;
	set: (token: string) => void;
	remove: () => void;
}
