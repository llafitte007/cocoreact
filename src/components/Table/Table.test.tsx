/* eslint-disable no-unused-vars */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Table from "./Table";
import { IField } from "../../core";
import DefaultTableFieldOptionsBuilder from "../../DefaultTableFieldOptionsBuilder";
import defaultTableWidgetOptionsBuilder from "../../defaultTableWidgetOptionsBuilder";
import { EditIcon } from "../Theme";

configure({ adapter: new Adapter() });

// data: T[];
// fields: TableRowFieldsProps<T>["fields"];
// noDataLabel: TableRowEmptyProps["noDataLabel"];
// widgetOptions: TableRowDataProps<T>["widgetOptions"];

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
		createdAt: { name: "createdAt", type: "date" }
	} as Record<"id" | "name" | "enabled" | "createdAt", IField>;
}

const fieldsBuilder = new DefaultTableFieldOptionsBuilder<TestResponse>()
	.initialize(TestResponse.Fields)
	.set(TestResponse.Fields.createdAt, {
		format: "dddd Do",
		formatter: (d, _format) => d.toISOString(),
		label: "créer le"
	});

const widgetBuilder = defaultTableWidgetOptionsBuilder;

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
	expect(table).toContain("Créer le");

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
		expect(table).toContain(d.createdAt.toISOString());
	});
});

test("button", () => {
	fieldsBuilder.set("", {
		type: "button",
		icon: <EditIcon />,
		href: "https://www.example.com"
	});

	const data = [new TestResponse(1)];
	const fields = fieldsBuilder.build();

	const container = shallow(
		<Table<TestResponse>
			data={data}
			fields={fields}
			widgetOptions={widgetBuilder.build()}
			noDataLabel="no provided data"
		/>
	);

	const table = container.html();
	expect(table).toContain("<a");
	expect(table).toContain('href="https://www.example.com"');
});
