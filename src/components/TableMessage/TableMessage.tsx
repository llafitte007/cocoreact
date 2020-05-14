/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback, Fragment, useRef } from "react";

import { Table, TableProps } from "../Table";
import { IMessage, useMessage } from "../../core/Message";
import { ISerializer } from "../../core/Serializer";
import { IHttpClient } from "../../core/HttpClient";

export interface TableMessageProps<T> {
	fields: TableProps<T>["fields"];
	noDataLabel: TableProps<T>["noDataLabel"];
	loading?: TableProps<T>["loading"];
	padding?: TableProps<T>["padding"];
	className?: TableProps<T>["className"];
	classes?: TableProps<T>["classes"];
	style?: TableProps<T>["style"];
	widgetOptions: TableProps<T>["widgetOptions"];

	buildMessage: () => IMessage;
	serializer: ISerializer;
	httpClient: IHttpClient;
	fetchDataLabel: string;
	updateRef?: React.RefObject<HTMLButtonElement>;
}

export function useUpdateTableMessage() {
	const ref = useRef<HTMLButtonElement>(null);
	const updateHandle = useCallback(() => {
		if (ref.current) {
			ref.current.click();
		}
	}, [ref]);
	return [ref, updateHandle];
}

export default function TableMessage<T>({
	buildMessage,
	serializer,
	httpClient,
	updateRef,
	fetchDataLabel,
	noDataLabel,
	...props
}: TableMessageProps<T>) {
	const message = useMemo(() => buildMessage(), [buildMessage]);

	const [loading, data, updateData, error] = useMessage<T[]>(
		message,
		[],
		serializer,
		httpClient
	);

	const updateHandle = useCallback(updateData, [updateData]);

	return (
		<Fragment>
			<Table
				data={error ? [] : data}
				loading={loading}
				{...props}
				noDataLabel={error ? fetchDataLabel : noDataLabel}
			/>
			<button
				onClick={updateHandle}
				style={{ display: "none" }}
				ref={updateRef}
			/>
		</Fragment>
	);
}
