export type ODataFilterOperator =
	| "contains"
	| "eq"
	| "ne"
	| "lt"
	| "le"
	| "gt"
	| "ge";

export interface IODataFilterItem {
	name: string;
	operator: ODataFilterOperator;
	value: any;
}

export default class ODataFilter {
	filters: Record<string, IODataFilterItem>;

	constructor() {
		this.filters = {};
	}

	public set(name: string, operator: ODataFilterOperator, value: any) {
		this.filters[name] = { name, operator, value } as IODataFilterItem;
	}

	public setValue(name: string, value: any) {
		if (this.filters[name] !== undefined) {
			this.filters[name].value = value;
		} else {
			console.error(`undefined filter named "${name}"`);
		}
		return this;
	}

	public setOperator(name: string, operator: ODataFilterOperator) {
		if (this.filters[name] !== undefined) {
			this.filters[name].operator = operator;
		} else {
			console.error(`undefined filter named "${name}"`);
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
