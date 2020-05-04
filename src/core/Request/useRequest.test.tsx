/* eslint-disable no-unused-vars */
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { IHttpClient } from "../HttpClient";
import IRequest from "./IRequest";
import useRequest from "./useRequest";

configure({ adapter: new Adapter() });

class FakeHttpClient implements IHttpClient {
	_counter: number = 0;
	constructor(defaultCounter: number) {
		this._counter = defaultCounter;
	}

	sendRequest<TResquest extends IRequest>(_request: TResquest): Promise<any> {
		this._counter++;
		return new Promise(() => this._counter);
	}
}

function FakeComponent({ defaultValue }: { defaultValue: number }) {
	const httpClient = React.useMemo(() => new FakeHttpClient(defaultValue), [
		defaultValue
	]);

	const [loading, counter, update] = useRequest(
		{} as IRequest,
		defaultValue,
		httpClient
	);

	return (
		<div>
			<input id="counter" value={counter} />
			<button id="btn" onClick={() => update()} disabled={loading}>
				update
			</button>
		</div>
	);
}

test("testing initial loading, initial value & update", async () => {
	const container = shallow(<FakeComponent defaultValue={666} />);

	waitingRefresh(() => {
		expect(container.find("#btn").prop("disabled")).toBeTruthy();
		expect(container.find("#counter").prop("value")).toBe(666);
	});

	container.find("#btn").simulate("click");
	expect(container.find("#btn").prop("disabled")).toBe(true);

	waitingRefresh(() => {
		expect(container.find("#btn").prop("disabled")).toBeTruthy();
		expect(container.find("#counter").prop("value")).toBe(667);
	});
});

function waitingRefresh(callback: any) {
	setTimeout(() => {
		callback();
	}, 0);
}
