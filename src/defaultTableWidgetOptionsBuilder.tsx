/* eslint-disable no-unused-vars */

import {
	TextTableWidget,
	DateTableWidget,
	SwitchTableWidget,
	ButtonTableWidget
} from "./components/TableWidgets";

import { TypeWidgetOptionsBuilder } from "./core/TypeWidget";

const defaultTableWidgetOptionsBuilder = new TypeWidgetOptionsBuilder()
	.set("string", TextTableWidget)
	.set("number", TextTableWidget)
	.set("Date", DateTableWidget)
	.set("boolean", SwitchTableWidget)
	.set("button", ButtonTableWidget);

export default defaultTableWidgetOptionsBuilder;
