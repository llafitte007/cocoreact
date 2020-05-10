/* eslint-disable no-unused-vars */
import React from "react";
import TypeWidgetOptionsBuilder from "./TypeWidgetOptionsBuilder";

class ClassComponentTest extends React.Component {
	render() {
		return null;
	}
}

function FunctionnalComponentTest() {
	return null;
}

test("associated components to differents types", () => {
	const builder = new TypeWidgetOptionsBuilder();
	builder
		.set("class", ClassComponentTest)
		.set("function", FunctionnalComponentTest);

	const options = builder.build();
	expect(options.length()).toBe(2);
	expect(options.get("class")).toBe(ClassComponentTest);
	expect(options.get("function")).toBe(FunctionnalComponentTest);
});

test("associated components to the same type (override)", () => {
	const builder = new TypeWidgetOptionsBuilder();
	builder
		.set("string", ClassComponentTest)
		.set("string", FunctionnalComponentTest);

	const options = builder.build();
	expect(options.length()).toBe(1);
	expect(options.get("string")).toBe(FunctionnalComponentTest);
});

test("remove a type component", () => {
	const builder = new TypeWidgetOptionsBuilder();
	builder
		.set("class", ClassComponentTest)
		.set("function", FunctionnalComponentTest)
		.remove("function");

	const options = builder.build();
	expect(options.length()).toBe(1);
	expect(options.get("class")).toBe(ClassComponentTest);
	expect(() => {
		options.get("function");
	}).toThrow();
});
