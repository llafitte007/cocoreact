/* eslint-disable no-unused-vars */
import { IConverter } from "./IConverter";

export default class DateConverter implements IConverter {
	private static dateRegexp = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z?)/;

	canRead(data: any) {
		return typeof data === "string" && DateConverter.dateRegexp.test(data);
	}

	read(data: string) {
		return new Date(data);
	}

	canWrite(data: any) {
		return (
			(typeof data === "string" && DateConverter.dateRegexp.test(data)) ||
			Object.prototype.toString.call(data) === "[object Date]"
		);
	}

	write(data: string | Date) {
		const d = new Date(data);
		return d.toISOString();
	}
}
