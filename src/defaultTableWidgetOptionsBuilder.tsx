/* eslint-disable no-unused-vars */

import TextField from "./components/TableWidgets/TextField";
import DateField from "./components/TableWidgets/DateField";
import SwitchField from "./components/TableWidgets/SwitchField";
import ButtonField from "./components/TableWidgets/ButtonField";

import { TypeWidgetOptionsBuilder } from "./core/TypeWidget";

const defaultTableWidgetOptionsBuilder = new TypeWidgetOptionsBuilder()
	.set("string", TextField)
	.set("number", TextField)
	.set("date", DateField)
	.set("boolean", SwitchField)
	.set("button", ButtonField);

export default defaultTableWidgetOptionsBuilder;
