/* eslint-disable no-unused-vars */
import { IField } from "./IField";
import IFieldSet from "./IFieldSet";

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
	const set = new IFieldSet();
	set.initialize(Test.FieldsObj);

	expect(set.length()).toBe(3);
	expect(set.get("content")).toStrictEqual(Test.FieldsObj.content);
	expect(set.get("count")).toStrictEqual(Test.FieldsObj.count);
	expect(set.get("enabled")).toStrictEqual(Test.FieldsObj.enabled);
});

test("initialize from IField arr", () => {
	const set = new IFieldSet();
	set.initialize(Test.FieldsArr);

	expect(set.length()).toBe(3);
	expect(set.get("content")).toStrictEqual(Test.FieldsObj.content);
	expect(set.get("count")).toStrictEqual(Test.FieldsObj.count);
	expect(set.get("enabled")).toStrictEqual(Test.FieldsObj.enabled);
});

test("add own field (with own type)", () => {
	const set = new IFieldSet<TestOptions>();
	set.set("test", {
		type: "test",
		color: "primary"
	});
	set.set(Test.FieldsObj.content, {
		type: "test",
		color: "secondary"
	});
	set.set("content", {
		label: "label"
	});

	expect(set.length()).toBe(2);

	expect(set.get("test")).toStrictEqual({
		name: "test",
		type: "test",
		color: "primary"
	});
	expect(set.get("content")).toStrictEqual({
		name: "content",
		type: "test",
		color: "secondary",
		label: "label"
	});
});

test("set field options (with own type)", () => {
	const set = new IFieldSet<TestOptions>();
	set.initialize(Test.FieldsObj);
	set.set("content", { type: "string", color: "primary" });
	set.set(Test.FieldsObj.count, { color: "secondary" });
	set.set("count", { label: "label" });

	expect(set.length()).toBe(3);

	expect(set.get("content")).toStrictEqual({
		...Test.FieldsObj.content,
		color: "primary"
	});
	expect(set.get("count").color).toBe("secondary");
	expect(set.get("count").label).toBe("label");
	expect(set.get("enabled").color).toBe(undefined);
});

test("change position ", () => {
	const set = new IFieldSet();
	set.initialize(Test.FieldsObj);
	set.set(Test.FieldsObj.enabled, { position: 0 });
	set.set(Test.FieldsObj.count, { position: 2 });

	const fields = set.toList();

	expect(fields.length).toBe(3);
	expect(fields[0].name).toBe("enabled");
	expect(fields[1].name).toBe("count");
	expect(fields[2].name).toBe("content");
});

test("remove using hidden ", () => {
	const set = new IFieldSet();
	set.initialize(Test.FieldsObj);
	set.set(Test.FieldsObj.count, { hidden: true });
	set.hidden(Test.FieldsObj.enabled);

	const fields = set.toList();

	expect(fields.length).toBe(1);
	expect(fields[0].name).toBe("content");
});

test("throw error if field name not exists ", () => {
	const set = new IFieldSet();
	set.initialize(Test.FieldsObj);

	expect(() => {
		set.get("test");
	}).toThrow();
});
