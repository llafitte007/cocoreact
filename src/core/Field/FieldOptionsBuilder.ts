/* eslint-disable no-unused-vars */
import IField from "./IField";

interface _IFieldOptionsBase {
	position?: number;
	hidden?: boolean;
}

export default class FieldOptionsBuilder<TField extends IField = IField> {
	protected _fields: (TField & _IFieldOptionsBase)[];
	protected _defaultFieldBuilder?: (options: TField) => TField;

	constructor(
		defaultFieldBuilder?: (
			options: TField & _IFieldOptionsBase
		) => TField & _IFieldOptionsBase
	) {
		this._fields = [];
		this._defaultFieldBuilder = defaultFieldBuilder;
	}

	initialize(fields: IField[] | Record<string, IField>) {
		if (Array.isArray(fields)) {
			fields.forEach((ff) => this.add(ff));
		} else {
			for (const k in fields) {
				this.add(fields[k]);
			}
		}
		return this;
	}

	add(
		field: IField | (TField & _IFieldOptionsBase),
		options?: Partial<TField & _IFieldOptionsBase>
	) {
		let fieldOptions = {
			...field,
			...options
		} as TField;

		if (this._defaultFieldBuilder) {
			fieldOptions = this._defaultFieldBuilder(fieldOptions);
		}
		this._add(fieldOptions);
	}

	private _add(field: TField) {
		const sameName = this._get(field.name);
		if (sameName !== undefined) {
			throw Error(
				`Another field exists with same name ${sameName.name} and type ${sameName.type}`
			);
		}
		this._fields.push(field);
	}

	private _get(name: string) {
		const idx = this._getIndex(name);
		return idx < 0 ? undefined : this._fields[idx];
	}

	private _getIndex(name: string) {
		return this._fields.findIndex((x) => x.name === name);
	}

	set(field: IField | string, options: Partial<TField & _IFieldOptionsBase>) {
		const fielName = typeof field === "string" ? field : field.name;
		const idx = this._getIndex(fielName);

		if (idx < 0) {
			throw Error(`Unknow field with name ${fielName} founded`);
		}

		this._fields[idx] = { ...this._fields[idx], ...options };
	}

	hidden(field: IField | string) {
		this.set(field, <TField & _IFieldOptionsBase>{ hidden: true });
		return this;
	}

	buildFields(): TField[] {
		return this._fields
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
