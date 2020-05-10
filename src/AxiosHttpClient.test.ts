/* eslint-disable no-unused-vars */
import AxiosHttpClient from "./AxiosHttpClient";
import { IRequest } from "./core/Request";

interface ITestTodo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

test("send request and retreive valid response (string)", async () => {
	const httpClient = new AxiosHttpClient(
		"https://jsonplaceholder.typicode.com"
	);
	const request = {
		path: "/todos/1",
		method: "GET"
	} as IRequest;

	const response = await httpClient.sendRequest(request);
	expect(typeof response).toBe("string");

	const todo = JSON.parse(response) as ITestTodo;
	expect(todo.id).toBe(1);
});

test("throw error if something went wrong", async () => {
	const httpClient = new AxiosHttpClient(
		"https://jsonplaceholder.typicode.com"
	);
	const request = {
		path: "/fake",
		method: "GET"
	} as IRequest;

	let error = null as Error | null;
	try {
		await httpClient.sendRequest(request);
	} catch (e) {
		error = e;
	}
	expect(error).not.toBeNull();
}, 5000);
