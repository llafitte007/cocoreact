/* eslint-disable no-unused-vars */
import { IConverter } from "./IConverter";
import { isGuid, Guid } from "../types/Guid";

export default class GuidConverter implements IConverter {
	canRead(data: any) {
		return typeof data === "string" && isGuid(data);
	}

	read(data: string) {
		return data as Guid;
	}

	canWrite(data: any) {
		return typeof data === "string" && isGuid(data);
	}

	write(data: Guid) {
		return data;
	}
}
