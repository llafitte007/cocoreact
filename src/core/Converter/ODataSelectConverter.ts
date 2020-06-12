/* eslint-disable no-unused-vars */
import { IConverter } from "./IConverter";
import { ODataSelect } from "../OData";

export default class ODataSelectConverter implements IConverter {
	canRead(_data: any) {
		return false;
	}

	read(data: any) {
		return data;
	}

	canWrite(data: any) {
		return data instanceof ODataSelect;
	}

	write(data: ODataSelect) {
		if (data.members.length > 0) {
			return data.members.join(",");
		}
		return "";
	}
}
