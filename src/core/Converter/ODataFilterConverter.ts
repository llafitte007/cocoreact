/* eslint-disable no-unused-vars */
import { IConverter } from "./IConverter";
import { ODataFilter, IODataFilterItem } from "../OData";
import DateConverter from "./DateConverter";

export default class ODataFilterConverter implements IConverter {
	_dateConverter: DateConverter;

	constructor() {
		this._dateConverter = new DateConverter();
	}

	canRead(_data: any) {
		return false;
	}

	read(data: any) {
		return data;
	}

	canWrite(data: any) {
		return data instanceof ODataFilter;
	}

	convertItem(item: IODataFilterItem): string | undefined {
		if (!item.operator || item.value === undefined) {
			return undefined;
		}
		if (
			typeof item.value === "string" &&
			(!item.value || item.value === "undefined")
		) {
			return undefined;
		}

		let valueStr = undefined as string | undefined;
		if (Object.prototype.toString.call(item.value) === "[object Date]") {
			valueStr = this._dateConverter.write(item.value);
		} else if (item.value === "true" || item.value === "false") {
			valueStr = item.value;
		} else if (item.value === true || item.value === false) {
			valueStr = item.value === true ? "true" : "false";
		} else {
			valueStr = `'${item.value.toString().replace(/'/g, "''")}'`;
		}

		if (item.operator === "contains") {
			return `${item.operator}(toLower(${item.name}), ${valueStr})`;
		}
		return `(${item.name} ${item.operator} ${valueStr})`;
	}

	write(data: ODataFilter) {
		const parts = [] as string[];
		for (const k in data.filters) {
			const filter = data.filters[k];
			const filterStr = this.convertItem(filter);
			if (filterStr) {
				parts.push(filterStr);
			}
		}
		return parts.length > 0 ? parts.join(" and ") : "";
	}
}
