/* eslint-disable no-unused-vars */
import IFormWidget, { IFormWidgetComponent } from "./IFormWidget";
import FormWidgetOptions from "./FormWidgetOptions";

export default class FormWidgetOptionsBuilder {
	private _widgets: IFormWidget[];

	constructor() {
		this._widgets = [];
	}

	add(
		formWidget: string | IFormWidget,
		component?: IFormWidgetComponent
	): FormWidgetOptionsBuilder {
		if (typeof formWidget === "string" && component !== undefined) {
			this._add(<IFormWidget>{
				type: formWidget,
				component: component
			});
		} else if (typeof formWidget !== "string") {
			this._add(formWidget);
		}
		return this;
	}

	private _add(widget: IFormWidget) {
		const sameType = this._widgets.find((x) => x.type === widget.type);
		if (sameType !== undefined) {
			throw Error(
				`Another from widget exists with same type ${widget.type}}`
			);
		}
		this._widgets.push(widget);
	}

	build() {
		return new FormWidgetOptions(this._widgets);
	}
}
