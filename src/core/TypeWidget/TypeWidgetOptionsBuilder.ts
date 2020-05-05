/* eslint-disable no-unused-vars */
import ITypeWidget, { ITypeWidgetComponent } from "./ITypeWidget";
import TypeWidgetOptions from "./TypeWidgetOptions";

export default class TypeWidgetOptionsBuilder {
	private _widgets: ITypeWidget[];

	constructor() {
		this._widgets = [];
	}

	add(
		typeWidget: string | ITypeWidget,
		component?: ITypeWidgetComponent
	): TypeWidgetOptionsBuilder {
		if (typeof typeWidget === "string" && component !== undefined) {
			this._add(<ITypeWidget>{
				type: typeWidget,
				component: component
			});
		} else if (typeof typeWidget !== "string") {
			this._add(typeWidget);
		}
		return this;
	}

	private _add(widget: ITypeWidget) {
		const sameType = this._widgets.find((x) => x.type === widget.type);
		if (sameType !== undefined) {
			throw Error(
				`Another from widget exists with same type ${widget.type}}`
			);
		}
		this._widgets.push(widget);
	}

	build() {
		return new TypeWidgetOptions(this._widgets);
	}
}
