/* eslint-disable no-unused-vars */
import TextField from "./components/FormWidgets/TextField";
import SelectField from "./components/FormWidgets/SelectField";
import SwitchField from "./components/FormWidgets/SwitchField";
import DateField from "./components/FormWidgets/DateField";
import TimeField from "./components/FormWidgets/TimeField";
import AutoCompleteField from "./components/FormWidgets/AutoCompleteField";

import { FormWidgetOptionsBuilder } from "./core/FormWidget";

const defaultFormWidgetOptionsBuilder = new FormWidgetOptionsBuilder()
	.add("string", TextField)
	.add("number", TextField)
	.add("email", TextField)
	.add("password", TextField)
	.add("select", SelectField)
	.add("boolean", SwitchField)
	.add("date", DateField)
	.add("time", TimeField)
	.add("autocomplete", AutoCompleteField);

export default defaultFormWidgetOptionsBuilder;
