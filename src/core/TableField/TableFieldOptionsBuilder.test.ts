/* eslint-disable no-unused-vars */
import ITableField from "./ITableField";
import TableFieldOptionsBuilder from "./TableFieldOptionsBuilder";
import { IField } from "../IField";
import { capitalize } from "../../StringExtension";

class Test {
	content!: string;
	count!: number;
	enabled!: boolean;

	public static FieldsArr = [
		{ name: "content", type: "string" },
		{ name: "count", type: "number" },
		{ name: "enabled", type: "boolean" }
	] as IField[];

	public static FieldsObj = {
		content: { name: "content", type: "string" },
		count: { name: "count", type: "number" },
		enabled: { name: "enabled", type: "boolean" }
	} as Record<"content" | "count" | "enabled", IField>;
}

function buildDefaultOptions(field: ITableField<any>) {
	const label = field.label
		? capitalize(field.label)
		: capitalize(field.name);
	return {
		...field,
		label,
		padding: "default"
	} as ITableField<any>;
}

test("initialize from IField record", () => {
	const builder = new TableFieldOptionsBuilder<ITableField<any>>();
	builder.initialize(Test.FieldsObj);

	const fields = builder.build();
	expect(fields.length).toBe(3);
	expect(fields[0].name).toBe("content");
	expect(fields[1].name).toBe("count");
	expect(fields[2].name).toBe("enabled");
});

test("can set parameter", () => {
	const builder = new TableFieldOptionsBuilder<ITableField<any>>();
	builder.initialize(Test.FieldsObj);
	builder.set("content", { label: "content label" });

	const fields = builder.build();
	expect(fields.length).toBe(3);
	expect(fields[0].name).toBe("content");
	expect(fields[0].label).toBe("content label");
});

test("remove and change position", () => {
	const builder = new TableFieldOptionsBuilder<ITableField<any>>();
	builder.initialize(Test.FieldsObj);
	builder.set("count", { position: 1 });
	builder.hidden(Test.FieldsObj.enabled);

	const fields = builder.build();
	expect(fields.length).toBe(2);
	expect(fields[0].name).toBe("count");
	expect(fields[1].name).toBe("content");
});

test("use defined default options", () => {
	const builder = new TableFieldOptionsBuilder<ITableField<any>>(
		buildDefaultOptions
	);
	builder.initialize(Test.FieldsObj);
	builder.set(Test.FieldsObj.content, { label: "contenu" });

	const fields = builder.build();
	expect(fields.length).toBe(3);
	expect(fields[0].label).toBe("Contenu");
	expect(fields[0].padding).toBe("default");
	expect(fields[1].label).toBe("Count");
	expect(fields[1].padding).toBe("default");
	expect(fields[2].label).toBe("Enabled");
	expect(fields[2].padding).toBe("default");
});
