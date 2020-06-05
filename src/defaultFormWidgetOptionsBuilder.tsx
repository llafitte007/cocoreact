/* eslint-disable no-unused-vars */
import {
	TextFormWidget,
	SelectFormWidget,
	SwitchFormWidget,
	DateFormWidget,
	TimeFormWidget,
	AutoCompleteFormWidget
} from "./components/FormWidgets";

import { TypeWidgetOptionsBuilder } from "./core/TypeWidget";

// changer add en set
const defaultFormWidgetOptionsBuilder = new TypeWidgetOptionsBuilder()
	.set("string", TextFormWidget)
	.set("number", TextFormWidget)
	.set("email", TextFormWidget)
	.set("password", TextFormWidget)
	.set("select", SelectFormWidget)
	.set("boolean", SwitchFormWidget)
	.set("Date", DateFormWidget)
	.set("time", TimeFormWidget)
	.set("autocomplete", AutoCompleteFormWidget);

export default defaultFormWidgetOptionsBuilder;
