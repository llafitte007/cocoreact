/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";

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
	updateRef?: React.RefObject<HTMLButtonElement>;
}

export default function TableMessage<T>({
	buildMessage,
	serializer,
	httpClient,
	updateRef,
	noDataLabel,
	loaderSize,
	classes,
	...props
}: TableMessageProps<T>) {
	const message = useMemo(() => buildMessage(), [buildMessage]);

	const [loading, data, updateData] = useMessage<T[]>(
		message,
		[],
		serializer,
		httpClient
	);

	return (
		<LoadingWrapper
			loading={loading}
			loaderSize={loaderSize}
			classes={classes?.loader}
		>
			<Table
				data={data}
				{...props}
				noDataLabel={noDataLabel}
				classes={classes?.table}
			/>
			<button
				onClick={updateData}
				style={{ display: "none" }}
				ref={updateRef}
			/>
		</LoadingWrapper>
	);
}
