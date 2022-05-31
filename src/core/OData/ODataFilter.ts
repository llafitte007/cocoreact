export type ODataFilterOperator =
	| "contains"
	| "eq"
	| "ne"
	| "lt"
	| "le"
	| "gt"
	| "ge";

export type ODataFilterJoin = "or" | "and";

export interface IODataFilterItem {
	fields: string[];
	operator: ODataFilterOperator;
	value: any;
	join: ODataFilterJoin;
}

export default class ODataFilter {
	filters: Record<string, IODataFilterItem>;
	join: ODataFilterJoin;

	constructor() {
		this.filters = {};
		this.join = "and";
	}

	public set(
		key: string,
		fields: string | string[],
		operator: ODataFilterOperator,
		value: any,
		join = "or" as ODataFilterJoin
	) {
		const fieldsArr = Array.isArray(fields) ? fields : [fields];
		this.filters[key] = { fields: fieldsArr, operator, value, join };
	}

	public setValue(key: string, value: any) {
		if (this.filters[key] !== undefined) {
			this.filters[key].value = value;
		} else {
			console.error(`undefined filter named "${key}"`);
		}
		return this;
	}

	public setOperator(key: string, operator: ODataFilterOperator) {
		if (this.filters[key] !== undefined) {
			this.filters[key].operator = operator;
		} else {
			console.error(`undefined filter named "${key}"`);
		}
		return this;
	}

	public getValues() {
		const values = {} as Record<string, any>;
		for (const k in this.filters) {
			values[k] = this.filters[k].value;
		}
		return values;
	}

	public getOperators() {
		const operators = {} as Record<string, ODataFilterOperator>;
		for (const k in this.filters) {
			operators[k] = this.filters[k].operator;
		}
		return operators;
	}
}
