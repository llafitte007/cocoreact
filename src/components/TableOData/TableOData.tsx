/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback, useRef } from "react";
import clsx from "clsx";

import {
	Table as MuiTable,
	TableHead as MuiTableHead,
	TableBody as MuiTableBody,
	TableFooter as MuiTableFooter,
	Padding,
	makeStyles,
	createStyles,
	Theme,
	darken
} from "@material-ui/core";
import TableRowFields, { TableRowFieldsProps } from "./TableRowFields";
import TableRowFilters, { TableRowFiltersProps } from "./TableRowFilters";
import TableRowPagination, {
	TableRowPaginationProps
} from "./TableRowPagination";
import { LoadingWrapper, LoadingWrapperProps } from "../LoadingWrapper";
import {
	TableRowData,
	TableRowDataProps,
	TableRowEmpty,
	TableRowEmptyProps
} from "../Table";
import {
	useMessage,
	ISerializer,
	IHttpClient,
	IODataMessage,
	IODataResponse,
	ODataFilterOperator
} from "../../core";
import { ClassesStyledComponent } from "../Theme";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		table: {},
		tableHead: {
			backgroundColor: darken(theme.palette.background.default, 0.2),
			color: theme.palette.getContrastText(
				darken(theme.palette.background.default, 0.2)
			)
		},
		tableBody: {
			"& tr:nth-of-type(even)": {
				backgroundColor: theme.palette.background.default
			}
		},
		tableFooter: {},
		loader: {}
	} as TableODataStyles)
);

export interface TableODataStyles {
	table: any;
	tableHead: any;
	tableBody: any;
	tableFooter: any;
	loader: any;
}

export interface TableODataProps<T>
	extends ClassesStyledComponent<TableODataStyles> {
	padding?: Padding;
	errorDataLabel: string;
	loaderSize?: LoadingWrapperProps["loaderSize"];
	fields: TableRowFieldsProps<T>["fields"];
	filterWdigetOptions: TableRowFiltersProps<T>["widgetOptions"];
	bodyWidgetOptions: TableRowDataProps<T>["widgetOptions"];
	noDataLabel: TableRowEmptyProps["noDataLabel"];
	rowsPerPageOptions: TableRowPaginationProps["rowsPerPageOptions"];
	rowsPerPageLabel: TableRowPaginationProps["rowsPerPageLabel"];
	displayedRowLabel: TableRowPaginationProps["displayedRowLabel"];

	buildMessage: () => IODataMessage;
	serializer: ISerializer;
	httpClient: IHttpClient;
	fetchDataLabel: string;
	updateRef?: React.RefObject<HTMLButtonElement>;
}

export function useUpdateTableOData() {
	const ref = useRef<HTMLButtonElement>(null);
	const updateHandle = useCallback(() => {
		if (ref.current) {
			ref.current.click();
		}
	}, [ref]);
	return [ref, updateHandle];
}

export default function TableOData<T>({
	padding,
	errorDataLabel,
	fields,
	filterWdigetOptions,
	bodyWidgetOptions,
	noDataLabel,
	loaderSize,
	rowsPerPageOptions,
	rowsPerPageLabel,
	displayedRowLabel,

	buildMessage,
	serializer,
	httpClient,
	updateRef,
	classes
}: TableODataProps<T>) {
	const styles = useStyles() as TableODataStyles;

	const initialData = useMemo(() => {
		return { count: 0, results: [] } as IODataResponse<T>;
	}, []);
	const message = useMemo(() => buildMessage(), [buildMessage]);

	const [loading, data, updateData, error] = useMessage<IODataResponse<T>>(
		message,
		initialData,
		serializer,
		httpClient
	);

	const sortHandle = useCallback(
		(fieldname: string) => {
			message.orderBy.set(fieldname);
			updateData();
		},
		[message, updateData]
	);

	const filterHandle = useCallback(
		(name: string, operator: ODataFilterOperator, value: any) => {
			message.filter.set(name, operator, value);
			updateData();
		},
		[message, updateData]
	);

	const paginationHandle = useCallback(
		(page: number, rowsPerPage: number) => {
			page = rowsPerPage !== message.top ? 0 : page;
			message.top = rowsPerPage;
			message.skip = rowsPerPage * page;
			updateData();
		},
		[message, updateData]
	);

	return (
		<LoadingWrapper
			loading={loading}
			loaderSize={loaderSize}
			className={clsx(styles.loader, classes?.loader)}
		>
			<MuiTable
				padding={padding ?? "default"}
				className={clsx(styles.table, classes?.table)}
			>
				<MuiTableHead
					className={clsx(styles.tableHead, classes?.tableHead)}
				>
					<TableRowFields
						fields={fields}
						sortName={message.orderBy.member}
						sortDirection={message.orderBy.direction}
						onChange={sortHandle}
					/>
					<TableRowFilters
						fields={fields}
						filtersValue={message.filter.getValues()}
						filtersOperator={message.filter.getOperators()}
						widgetOptions={filterWdigetOptions}
						onChange={filterHandle}
					/>
				</MuiTableHead>

				<MuiTableBody
					className={clsx(styles.tableBody, classes?.tableBody)}
				>
					{(data.results.length === 0 || error) && (
						<TableRowEmpty
							noDataLabel={error ? errorDataLabel : noDataLabel}
							colSpan={fields.length}
						/>
					)}

					{data.results.length > 0 &&
						!error &&
						data.results.map((dataRow, idx) => (
							<TableRowData<T>
								key={idx}
								data={dataRow}
								fields={fields}
								widgetOptions={bodyWidgetOptions}
							/>
						))}
				</MuiTableBody>

				<MuiTableFooter
					className={clsx(styles.tableFooter, classes?.tableFooter)}
				>
					<TableRowPagination
						colSpan={fields.length}
						count={data.count}
						page={message.skip / message.top}
						rowsPerPage={message.top}
						rowsPerPageLabel={rowsPerPageLabel}
						rowsPerPageOptions={rowsPerPageOptions}
						displayedRowLabel={displayedRowLabel}
						onChange={paginationHandle}
					/>
				</MuiTableFooter>
			</MuiTable>
			<button
				onClick={updateData}
				style={{ display: "none" }}
				ref={updateRef}
			/>
		</LoadingWrapper>
	);
}
