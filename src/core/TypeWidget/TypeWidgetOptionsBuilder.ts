/* eslint-disable no-unused-vars */
import TypeWidgetOptions, { ITypeWidgetComponent } from "./TypeWidgetOptions";

export default class TypeWidgetOptionsBuilder {
	private _typeComponents: Record<string, ITypeWidgetComponent>;

	constructor() {
		this._typeComponents = {};
	}

	set(type: string, component: ITypeWidgetComponent) {
		this._typeComponents[type] = component;
		return this;
	}

	remove(type: string) {
		delete this._typeComponents[type];
		return this;
	}

	build() {
		return new TypeWidgetOptions(this._typeComponents);
	}
}
