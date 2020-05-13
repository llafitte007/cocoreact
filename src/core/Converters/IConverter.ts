export interface IConverter {
	canRead: (data: any) => boolean;
	read: (data: any) => unknown;
	canWrite: (data: any) => boolean;
	write: (data: any) => string;
}
