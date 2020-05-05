/* eslint-disable no-unused-vars */
import ITableField from "./ITableField";
import TableFieldOptions from "./TableFieldOptions";
import IField from "../types/IField";

interface _ITableFieldOptions {
	position?: number;
	hidden?: boolean;
}

export default class TableFieldOptionsBuilder<
	T,
	TTableField extends ITableField<T> = ITableField<T>
> {
	private _tableFields: (TTableField & _ITableFieldOptions)[];
	private _defaultFieldBuilder?: (
		data: TTableField & _ITableFieldOptions
	) => TTableField & _ITableFieldOptions;

	constructor(
		defaultFieldBuilder?: (
			data: TTableField & _ITableFieldOptions
		) => TTableField & _ITableFieldOptions
	) {
		this._tableFields = [];
		this._defaultFieldBuilder = defaultFieldBuilder;
	}

	initialize(tableFields: IField[] | Record<string, IField>) {
		if (Array.isArray(tableFields)) {
			tableFields.forEach((ff) => this.add(ff));
		} else {
			for (const k in tableFields) {
				this.add(tableFields[k]);
			}
		}
		return this;
	}

	add(
		field: IField | (TTableField & _ITableFieldOptions),
		options?: Partial<TTableField & _ITableFieldOptions>
	) {
		let newTableField = {
			...field,
			...options
		} as TTableField & _ITableFieldOptions;

		if (this._defaultFieldBuilder) {
			newTableField = this._defaultFieldBuilder(newTableField);
		}
		this._add(newTableField);
	}

	private _add(tableField: TTableField & _ITableFieldOptions) {
		const sameName = this._get(tableField.name);
		if (sameName !== undefined) {
			throw Error(
				`Another table field exists with same name ${name} and type ${sameName.type}`
			);
		}
		this._tableFields.push(tableField);
	}

	private _get(name: string) {
		return this._tableFields.find((x) => x.name === name);
	}

	set(
		field: IField | string,
		options: Partial<TTableField & _ITableFieldOptions>
	) {
		let tableField =
			typeof field === "string"
				? this._get(field)
				: this._get(field.name);

		if (tableField === undefined) {
			throw Error(`Unknow table field with name ${name} founded`);
		}

		tableField = { ...tableField, options };
	}

	hidden(tableField: IField | string) {
		this.set(tableField, <TTableField & _ITableFieldOptions>{
			hidden: true
		});
		return this;
	}

	build() {
		const fields = this._tableFields
			.filter((f) => f.hidden !== true)
			.sort((a, b) => this._compare(a.position, b.position))
			.map((f) => {
				return ({ ...f } as unknown) as TTableField;
			});
		return new TableFieldOptions<T, TTableField>(fields);
	}

	private _compare(a: number | undefined, b: number | undefined) {
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
}
