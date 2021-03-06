/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { IHttpClient } from "../HttpClient";
import { IRequest } from "./IRequest";
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
	const httpClient = useMemo(() => new FakeHttpClient(defaultValue), [
		defaultValue
	]);

	const [loading, counter] = useRequest(
		{} as IRequest,
		defaultValue,
		httpClient
	);

	return (
		<div>
			<input id="counter" value={counter} />
			<input id="loading" value={"" + loading} />
		</div>
	);
}

test("testing initial loading, initial value & update", async () => {
	const container = shallow(<FakeComponent defaultValue={666} />);

	waitingRefresh(() => {
		expect(container.find("#counter").prop("value")).toBe(666);
	});
});

function waitingRefresh(callback: any) {
	setTimeout(() => {
		callback();
	}, 0);
}
