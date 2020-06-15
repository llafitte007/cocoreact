/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { ODataOrderBy, ODataSelect, ODataFilter } from "../OData";
import { IMessage } from "../Message";
import { RequestMethod } from "../Request";
import JsonSerializer from "./JsonSerializer";
import {
	DateConverter,
	ODataFilterConverter,
	ODataSelectConverter,
	ODataOrderByConverter
} from "../Converter";

const serializer = new JsonSerializer([
	new DateConverter(),
	new ODataFilterConverter(),
	new ODataSelectConverter(),
	new ODataOrderByConverter()
]);

test("serialize single value", () => {
	expect(serializer.serialize(undefined)).toBe(undefined);
	expect(serializer.serialize(null)).toBe(undefined);

	expect(serializer.serialize([])).toBe("[]");
	expect(serializer.serialize({})).toBe("{}");

	expect(serializer.serialize(true)).toBe("true");
	expect(serializer.serialize(false)).toBe("false");

	expect(serializer.serialize("string to serialize")).toBe(
		"string to serialize"
	);

	expect(serializer.serialize(1)).toBe("1");
	expect(serializer.serialize(3.14)).toBe("3.14");

	const date = new Date(1986, 11, 9);
	expect(serializer.serialize(date)).toBe("1986-12-09T00:00:00.000Z");
});

test("serialize object", () => {
	const date = new Date(1986, 11, 9);

	const obj = {
		count: 10,
		enabled: true,
		date: date
	};

	const serialized = serializer.serialize(obj);

	expect(serialized).toContain('{"count":10,');
	expect(serialized).toContain('"enabled":true,');
	expect(serialized).toContain('"date":"1986-12-09T00:00:00.000Z"}');
});

test("serialize array", () => {
	const stringArr = ["test", "toto", "tutu"];
	expect(serializer.serialize(stringArr)).toBe('["test","toto","tutu"]');

	const numberArr = [1, 2, 3];
	expect(serializer.serialize(numberArr)).toBe("[1,2,3]");

	const date = new Date(1986, 11, 9);
	const dateArr = [date, date];
	expect(serializer.serialize(dateArr)).toBe(
		'["1986-12-09T00:00:00.000Z","1986-12-09T00:00:00.000Z"]'
	);
});

test("serialize odata parts [orderBy, select, fitler]", () => {
	const orderBy = new ODataOrderBy();
	expect(serializer.serialize(orderBy)).toBe("");
	orderBy.set("test");
	expect(serializer.serialize(orderBy)).toBe("test asc");
	orderBy.set("test");
	expect(serializer.serialize(orderBy)).toBe("test desc");
	orderBy.set("toto");
	expect(serializer.serialize(orderBy)).toBe("toto asc");

	const select = new ODataSelect();
	expect(serializer.serialize(select)).toBe("");
	select.members.push("test");
	expect(serializer.serialize(select)).toBe("test");
	select.members.push("toto");
	select.members.push("tutu");
	expect(serializer.serialize(select)).toBe("test,toto,tutu");

	const filter = new ODataFilter();
	expect(serializer.serialize(filter)).toBe("");
	filter.set("test", "eq", "toto");
	expect(serializer.serialize(filter)).toBe("(test eq 'toto')");
	filter.setOperator("test", "contains");
	filter.setValue("test", "tutu");
	expect(serializer.serialize(filter)).toBe("contains(test, 'tutu')");
	filter.set("test2", "eq", "to'to");
	expect(serializer.serialize(filter)).toBe(
		"contains(test, 'tutu') and (test2 eq 'to''to')"
	);
});

class CustomrMessage implements IMessage {
	path!: string;
	method!: RequestMethod;
	needAuth!: boolean;
	queryString: Record<string, any> | undefined;
	body: Record<string, any> | undefined;

	getPath = () => this.path;
	getMethod = () => this.method;
	needAuthentication = () => this.needAuth;
	getQueryString = () => this.queryString;
	getBody = () => this.body;

	constructor(init: Partial<CustomrMessage>) {
		Object.assign(this, init);
	}
}

test("serialize simple message", () => {
	const message = new CustomrMessage({
		path: "/users",
		method: "GET",
		needAuth: false
	});
	const data = serializer.serializeMessage(message);

	expect(data.path).toBe("/users");
	expect(data.method).toBe("GET");
	expect(data.queryString).toBe(undefined);
	expect(data.body).toBe(undefined);
	expect(data.needAuthentication).toBe(false);
});

test("serialize message with authentication", () => {
	const message = new CustomrMessage({
		needAuth: true
	});
	const data = serializer.serializeMessage(message);

	expect(data.needAuthentication).toBe(true);
});

test("serialize message with body", () => {
	const message = new CustomrMessage({
		body: {
			str: "str",
			count: 10,
			flag: true,
			createdAt: new Date(1986, 11, 9, 16, 0, 0)
		}
	});
	const data = serializer.serializeMessage(message);
	expect(data.body).toContain(`"str":"str"`);
	expect(data.body).toContain(`"count":10`);
	expect(data.body).toContain(`"flag":true`);
	expect(data.body).toContain(`"createdAt":"1986-12-09T16:00:00.000Z"`);
});

test("serialize message with odata", () => {
	const message = new CustomrMessage({
		queryString: {
			orderBy: new ODataOrderBy(),
			select: new ODataSelect(),
			filter: new ODataFilter(),
			limit: 10
		}
	});

	expect(serializer.serializeMessage(message).queryString).toBe("limit=10");
	message.queryString?.orderBy.set("name");
	expect(serializer.serializeMessage(message).queryString).toBe(
		"orderBy=name asc&limit=10"
	);
	message.queryString?.select.members.push("id");
	message.queryString?.select.members.push("name");
	expect(serializer.serializeMessage(message).queryString).toBe(
		"orderBy=name asc&select=id,name&limit=10"
	);
	message.queryString?.filter.set("code", "lt", 40);
	expect(serializer.serializeMessage(message).queryString).toBe(
		"orderBy=name asc&select=id,name&filter=(code lt '40')&limit=10"
	);
});
