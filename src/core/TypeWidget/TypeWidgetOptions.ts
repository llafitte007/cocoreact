/* eslint-disable no-unused-vars */
import ITypeWidget from "./ITypeWidget";

export default class TypeWidgetOptions {
	private _widgets: ITypeWidget[];

	constructor(widgets: ITypeWidget[]) {
		this._widgets = widgets;
	}

	public get(type: string) {
		const widget = this._get(type);
		if (widget === undefined) {
			throw Error(`undefined type widget type "${type}"`);
		}
		return widget;
	}

	public getComponent(type: string) {
		return this.get(type).component;
	}

	private _get(type: string) {
		return this._widgets.find((r) => r.type === type);
	}
}
