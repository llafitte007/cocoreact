export type ODataFilterOperator =
	| "contains"
	| "eq"
	| "ne"
	| "lt"
	| "le"
	| "gt"
	| "ge";

export class ODataFilterItem {
	name: string;
	operator: ODataFilterOperator;
	value: any;

	constructor(
		name: string,
		operator: ODataFilterOperator,
		value: any = undefined
	) {
		this.name = name;
		this.operator = operator;
		this.value = value;
	}
}

export default class ODataFilter {
	filters: Map<string, ODataFilterItem>;

	constructor() {
		this.filters = new Map<string, ODataFilterItem>();
	}

	public set(name: string, operator: ODataFilterOperator, value: any) {
		const filter = new ODataFilterItem(name, operator, value);
		this.filters.set(name, filter);
	}

	public setValue(name: string, value: any) {
		const filter = this.filters.get(name);
		if (filter) {
			filter.value = value;
		} else {
			console.error(`undefined filter named "${name}"`);
		}
		return this;
	}

	public setOperator(name: string, operator: ODataFilterOperator) {
		const filter = this.filters.get(name);
		if (filter) {
			filter.operator = operator;
		} else {
			console.error(`undefined filter named "${name}"`);
		}
		return this;
	}
}
