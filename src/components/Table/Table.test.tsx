/* eslint-disable no-unused-vars */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Table from "./Table";
import {
	IField,
	TypeWidgetOptionsBuilder,
	TableFieldOptionsBuilder,
	ITableField
} from "../../core";
import {
	TextTableWidget,
	DateTableWidget,
	SwitchTableWidget,
	DateTableWidgetProps
} from "../TableWidgets";
import { capitalize } from "@material-ui/core";

configure({ adapter: new Adapter() });

class TestResponse {
	id: number;
	name: string;
	enabled: boolean;
	createdAt: Date;

	constructor(id: number) {
		this.id = id;
		this.name = `test_response_${id}`;
		this.enabled = id % 2 === 0;
		this.createdAt = new Date();
	}

	public static Fields = {
		id: { name: "id", type: "number" },
		name: { name: "name", type: "string" },
		enabled: { name: "enabled", type: "boolean" },
		createdAt: { name: "createdAt", type: "Date" }
	} as Record<"id" | "name" | "enabled" | "createdAt", IField>;
}

interface TestTableField<T> extends ITableField<T> {
	href?: string;
	format?: DateTableWidgetProps["format"];
	formatter?: DateTableWidgetProps["formatter"];
}

class TestTableFieldOptionsBuilder<T> extends TableFieldOptionsBuilder<
	T,
	TestTableField<T>
> {
	constructor() {
		super((field) => {
			field.label = field.label
				? capitalize(field.label)
				: capitalize(field.name);
			field.format = field.format ? field.format : "dddd Do";
			field.formatter = field.formatter
				? field.formatter
				: (d, _f) => "" + d;
			return field;
		});
	}
}

const fieldsBuilder = new TestTableFieldOptionsBuilder<
	TestResponse
>().initialize(TestResponse.Fields);

const widgetBuilder = new TypeWidgetOptionsBuilder()
	.set("string", TextTableWidget)
	.set("number", TextTableWidget)
	.set("Date", DateTableWidget)
	.set("boolean", SwitchTableWidget);

test("empty data table", () => {
	const container = shallow(
		<Table<TestResponse>
			data={[]}
			fields={fieldsBuilder.build()}
			widgetOptions={widgetBuilder.build()}
			noDataLabel="no provided data"
		/>
	);

	const table = container.html();
	expect(table).toContain("Id");
	expect(table).toContain("Name");
	expect(table).toContain("Enabled");

	expect(table).toContain("no provided data");
});

test("simple data table", () => {
	const data = [
		new TestResponse(1),
		new TestResponse(2),
		new TestResponse(3),
		new TestResponse(4)
	];

	const container = shallow(
		<Table<TestResponse>
			data={data}
			fields={fieldsBuilder.build()}
			widgetOptions={widgetBuilder.build()}
			noDataLabel="no provided data"
		/>
	);

	const table = container.html();
	data.forEach((d) => {
		expect(table).toContain(d.id);
		expect(table).toContain(d.name);
	});
});

function ButtonWidget({ label, href }: any) {
	return <a href={href}>{label}</a>;
}

test("custom type", () => {
	fieldsBuilder.custom({
		type: "link",
		label: "test",
		href: "https://www.example.com"
	});

	const data = [new TestResponse(1)];
	const fields = fieldsBuilder.build();
	widgetBuilder.set("link", ButtonWidget);

	const container = shallow(
		<Table<TestResponse>
			data={data}
			fields={fields}
			widgetOptions={widgetBuilder.build()}
			noDataLabel="no provided data"
		/>
	);

	const table = container.html();
	expect(table).toContain('<a href="https://www.example.com">Test</a>');
});
