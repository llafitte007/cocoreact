/* eslint-disable no-unused-vars */
import { IField, IFieldOptionsBase } from "./IField";

export default class IFieldSet<TField extends IField = IField> {
	protected _fields: Record<string, TField & IFieldOptionsBase>;
	private _cutomId: number;

	constructor() {
		this._fields = {};
		this._cutomId = 0;
	}

	initialize(
		fields:
			| (TField & IFieldOptionsBase)[]
			| Record<string, TField & IFieldOptionsBase>
	) {
		if (Array.isArray(fields)) {
			fields.forEach((ff) => this.set(ff.name, ff));
		} else {
			for (const k in fields) {
				this.set(k, fields[k]);
			}
		}
	}

	set(field: IField | string, options: Partial<TField & IFieldOptionsBase>) {
		const fieldName = typeof field === "string" ? field : field.name;
		if (fieldName === "") {
			throw new Error(
				`you can't set a field using an empty name. Set a name or use custom() method instead`
			);
		}
		let fieldOptions = {
			name: fieldName
		};
		if (typeof field !== "string") {
			fieldOptions = {
				...fieldOptions,
				...field
			};
		}
		fieldOptions = {
			...fieldOptions,
			...this._fields[fieldName],
			...options
		};
		this._fields[fieldName] = fieldOptions as TField & IFieldOptionsBase;
	}

	custom(options: Partial<TField & IFieldOptionsBase>) {
		const fieldOptions = {
			name: "",
			...options
		};
		this._fields[`custom_${this._cutomId}`] = fieldOptions as TField &
			IFieldOptionsBase;
		this._cutomId++;
	}

	get(field: IField | string) {
		const fieldName = typeof field === "string" ? field : field.name;
		const options = this._fields[fieldName];
		if (options === undefined) {
			throw new Error(`undefined field with name "${fieldName}"`);
		}
		return options;
	}

	keys() {
		return Object.keys(this._fields);
	}

	length() {
		return this.keys().length;
	}

	hidden(field: IField | string) {
		this.set(field, <TField & IFieldOptionsBase>{ hidden: true });
	}

	toList() {
		const fields = [] as (TField & IFieldOptionsBase)[];
		for (const f in this._fields) {
			fields.push(this._fields[f]);
		}

		return fields
			.filter((f) => f.hidden !== true)
			.sort((a, b) => comparePosition(a.position, b.position));
	}
}

export function comparePosition(a: number | undefined, b: number | undefined) {
	if (a === undefined && b === undefined) {
		return 1;
	} else if (a === undefined && b !== undefined) {
		return 1;
	} else if (a !== undefined && b === undefined) {
		return -1;
	} else {
		return (a as number) - (b as number);
	}
}
