/* eslint-disable no-unused-vars */
import TextField from "./components/FormWidgets/TextField";
import SelectField from "./components/FormWidgets/SelectField";
import SwitchField from "./components/FormWidgets/SwitchField";
import DateField from "./components/FormWidgets/DateField";
import TimeField from "./components/FormWidgets/TimeField";
import AutoCompleteField from "./components/FormWidgets/AutoCompleteField";

import { TypeWidgetOptionsBuilder } from "./core/TypeWidget";

// changer add en set
const defaultFormWidgetOptionsBuilder = new TypeWidgetOptionsBuilder()
	.set("string", TextField)
	.set("number", TextField)
	.set("email", TextField)
	.set("password", TextField)
	.set("select", SelectField)
	.set("boolean", SwitchField)
	.set("date", DateField)
	.set("time", TimeField)
	.set("autocomplete", AutoCompleteField);

export default defaultFormWidgetOptionsBuilder;
