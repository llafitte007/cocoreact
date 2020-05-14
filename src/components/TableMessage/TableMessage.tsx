/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback, useRef } from "react";

import { Table, TableProps } from "../Table";
import { LoadingWrapper, LoadingWrapperProps } from "../LoadingWrapper";
import { IMessage, useMessage, ISerializer, IHttpClient } from "../../core";

export interface TableMessageProps<T> {
	fields: TableProps<T>["fields"];
	widgetOptions: TableProps<T>["widgetOptions"];
	noDataLabel: TableProps<T>["noDataLabel"];
	padding?: TableProps<T>["padding"];
	classes?: {
		table?: TableProps<T>["classes"];
		loader?: LoadingWrapperProps["classes"];
	};
	loaderSize?: LoadingWrapperProps["loaderSize"];

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
	loaderSize,
	classes,
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
		<LoadingWrapper
			loading={loading}
			loaderSize={loaderSize}
			classes={classes?.loader}
		>
			<Table
				data={error ? [] : data}
				{...props}
				noDataLabel={error ? fetchDataLabel : noDataLabel}
				classes={classes?.table}
			/>
			<button
				onClick={updateHandle}
				style={{ display: "none" }}
				ref={updateRef}
			/>
		</LoadingWrapper>
	);
}
