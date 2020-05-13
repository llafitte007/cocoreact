/* eslint-disable no-unused-vars */
import { IConverter } from "./IConverter";
import { ODataOrderBy } from "../OData";

export default class ODataOrderByConverter implements IConverter {
	canRead(_data: any) {
		return false;
	}

	read(data: any) {
		return data;
	}

	canWrite(data: any) {
		return data instanceof ODataOrderBy;
	}

	write(data: ODataOrderBy) {
		if (data.member !== undefined && data.direction !== undefined) {
			return `${data.member} ${data.direction}`;
		}
		return "";
	}
}
