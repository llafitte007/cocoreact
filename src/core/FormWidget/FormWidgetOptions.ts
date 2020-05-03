/* eslint-disable no-unused-vars */
import IFormWidget from "./IFormWidget";

export default class FormWidgetOptions {
	private _widgets: IFormWidget[];

	constructor(widgets: IFormWidget[]) {
		this._widgets = widgets;
	}

	public get(type: string) {
		const widget = this._get(type);
		if (widget === undefined) {
			throw Error(`undefined form widget type "${type}"`);
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
