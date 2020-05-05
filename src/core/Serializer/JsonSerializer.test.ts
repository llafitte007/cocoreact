/* eslint-disable no-unused-vars */
import JsonSerializer from "./JsonSerializer";
import { IMessage } from "../Message";
import { RequestMethod } from "../Request";
import { createEmptyGuid } from "../types/Guid";

const serializer = new JsonSerializer();

test("serialize base", () => {
	expect(serializer.serialize(undefined)).toBe(undefined);
	expect(serializer.serialize(null)).toBe(undefined);

	expect(serializer.serialize([])).toBe("[]");
	expect(serializer.serialize({})).toBe("{}");

	expect(serializer.serialize(true)).toBe("true");
	expect(serializer.serialize(false)).toBe("false");

	expect(serializer.serialize(1)).toBe("1");
	expect(serializer.serialize(3.14)).toBe("3.14");

	const d = new Date(1986, 11, 9, 16, 0, 0);
	// date value not special serialized
	expect(serializer.serialize(d)).toBe('"1986-12-09T15:00:00.000Z"');
	// date object field special serialized
	expect(serializer.serialize({ date: d })).toContain(
		'"1986-12-09T16:00:00.000Z"'
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
			id: createEmptyGuid(),
			createdAt: new Date(1986, 11, 9, 16, 0, 0)
		}
	});
	const data = serializer.serializeMessage(message);
	expect(data.body).toContain(`"str":"str"`);
	expect(data.body).toContain(`"count":"10"`);
	expect(data.body).toContain(`"flag":"true"`);
	expect(data.body).toContain(`"id":"0000000-0000-0000-0000-000000000000"`);
	expect(data.body).toContain(`"createdAt":"1986-12-09T16:00:00.000Z"`);
});

test("serialize message with querystring", () => {
	const message = new CustomrMessage({
		queryString: {
			orderBy: "name",
			limit: 10
		}
	});
	const data = serializer.serializeMessage(message);
	expect(data.queryString).toEqual(`orderBy="name"&limit=10`);
});
