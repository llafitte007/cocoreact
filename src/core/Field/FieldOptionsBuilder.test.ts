/* eslint-disable no-unused-vars */
import FieldOptionsBuilder from "./FieldOptionsBuilder";
import { IField } from ".";
import { capitalize } from "../../StringExtension";

interface TestOptions extends IField {
	label?: string;
	color?: "primary" | "secondary";
}

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

test("initialize from IField record", () => {
	const builder = new FieldOptionsBuilder();
	builder.initialize(Test.FieldsObj);

	const fields = builder.buildFields();
	expect(fields.length).toBe(3);
	expect(fields[0]).toStrictEqual(Test.FieldsObj.content);
	expect(fields[1]).toStrictEqual(Test.FieldsObj.count);
	expect(fields[2]).toStrictEqual(Test.FieldsObj.enabled);
});

test("initialize from IField arr", () => {
	const builder = new FieldOptionsBuilder();
	builder.initialize(Test.FieldsArr);

	const fields = builder.buildFields();
	expect(fields.length).toBe(3);
	expect(fields[0]).toStrictEqual(Test.FieldsArr[0]);
	expect(fields[1]).toStrictEqual(Test.FieldsArr[1]);
	expect(fields[2]).toStrictEqual(Test.FieldsArr[2]);
});

test("add own field (with own type)", () => {
	const builder = new FieldOptionsBuilder<TestOptions>();
	builder.add({
		name: "test",
		type: "test",
		color: "primary"
	});
	builder.add(Test.FieldsObj.content, {
		type: "test",
		color: "secondary"
	});

	const fields = builder.buildFields();

	expect(fields.length).toBe(2);
	expect(fields[0]).toStrictEqual({
		name: "test",
		type: "test",
		color: "primary"
	});
	expect(fields[1]).toStrictEqual({
		name: "content",
		type: "test",
		color: "secondary"
	});
});

test("set field options (with own type)", () => {
	const builder = new FieldOptionsBuilder<TestOptions>();
	builder.initialize(Test.FieldsObj);
	builder.set("content", { color: "primary" });
	builder.set(Test.FieldsObj.count, { color: "secondary" });

	const fields = builder.buildFields();

	expect(fields.length).toBe(3);
	expect(fields[0]).toStrictEqual({
		...Test.FieldsObj.content,
		color: "primary"
	});
	expect(fields[1].color).toBe("secondary");
	expect(fields[2].color).toBe(undefined);
});

test("change position ", () => {
	const builder = new FieldOptionsBuilder();
	builder.initialize(Test.FieldsObj);
	builder.set(Test.FieldsObj.enabled, { position: 0 });
	builder.set(Test.FieldsObj.count, { position: 2 });

	const fields = builder.buildFields();

	expect(fields.length).toBe(3);
	expect(fields[0].name).toBe("enabled");
	expect(fields[1].name).toBe("count");
	expect(fields[2].name).toBe("content");
});

test("remove using hidden ", () => {
	const builder = new FieldOptionsBuilder();
	builder.initialize(Test.FieldsObj);
	builder.set(Test.FieldsObj.count, { hidden: true });
	builder.hidden(Test.FieldsObj.enabled);

	const fields = builder.buildFields();

	expect(fields.length).toBe(1);
	expect(fields[0].name).toBe("content");
});

test("default options builder", () => {
	const builder = new FieldOptionsBuilder<TestOptions>(
		(options: TestOptions) => {
			return {
				...options,
				label: capitalize(options.name),
				color: "primary"
			};
		}
	);
	builder.initialize(Test.FieldsObj);

	const fields = builder.buildFields();
	expect(fields.length).toBe(3);
	expect(fields[0]).toStrictEqual({
		name: "content",
		type: "string",
		label: "Content",
		color: "primary"
	});
});
