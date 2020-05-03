/* eslint-disable no-unused-vars */
import TextField from "./FormWidgets/TextField";
import SelectField from "./FormWidgets/SelectField";
import SwitchField from "./FormWidgets/SwitchField";
import DateField from "./FormWidgets/DateField";
import TimeField from "./FormWidgets/TimeField";
import AutoCompleteField from "./FormWidgets/AutoCompleteField";

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
