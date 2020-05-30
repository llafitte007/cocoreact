/* eslint-disable no-unused-vars */
import React, { useMemo, useCallback, useRef, useState } from "react";
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
import TableODataRowFields, {
	TableODataRowFieldsProps
} from "./TableODataRowFields";
import TableODataRowFilters, {
	TableODataRowFiltersProps
} from "./TableODataRowFilters";
import TableODataRowPagination, {
	TableODataRowPaginationProps
} from "./TableODataRowPagination";
import { LoadingWrapper, LoadingWrapperProps } from "../LoadingWrapper";
import {
	TableRowData,
	TableRowDataProps,
	TableRowEmpty,
	TableRowEmptyProps
} from "../Table";
import {
	ISerializer,
	IHttpClient,
	IODataMessage,
	IODataResponse,
	ODataFilterOperator,
	useODataMessage
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
	loaderSize?: LoadingWrapperProps["loaderSize"];
	fields: TableODataRowFieldsProps<T>["fields"];
	filterWdigetOptions: TableODataRowFiltersProps<T>["widgetOptions"];
	bodyWidgetOptions: TableRowDataProps<T>["widgetOptions"];
	noDataLabel: TableRowEmptyProps["noDataLabel"];
	rowsPerPageOptions: TableODataRowPaginationProps["rowsPerPageOptions"];
	rowsPerPageLabel: TableODataRowPaginationProps["rowsPerPageLabel"];
	displayedRowLabel: TableODataRowPaginationProps["displayedRowLabel"];

	buildMessage: () => IODataMessage;
	serializer: ISerializer;
	httpClient: IHttpClient;
	updateRef?: React.RefObject<HTMLButtonElement>;
}

export default function TableOData<T>({
	padding,
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
		return ({
			d: { __count: 0, results: [] }
		} as unknown) as IODataResponse<T>;
	}, []);

	const message = useMemo(() => buildMessage(), [buildMessage]);

	const timer = useRef<NodeJS.Timeout | null>(null);
	const [filtersValues, setFiltersValues] = useState(
		message.filter.getValues()
	);
	const [fitlersOperators, setFitlersOperators] = useState(
		message.filter.getOperators()
	);

	const [loading, data, dataCount, updateData] = useODataMessage<T>(
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
			message.skip = 0;
			message.filter.set(name, operator, value);
			setFiltersValues(message.filter.getValues());
			setFitlersOperators(message.filter.getOperators());

			const field = fields.find((x) => x.name === name);
			if (field && field.filterDelay && field.filterDelay > 0) {
				if (timer.current) {
					clearTimeout(timer.current);
				}
				timer.current = setTimeout(() => {
					updateData();
				}, field.filterDelay);
			} else {
				updateData();
			}
		},
		[fields, message.filter, message.skip, updateData]
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
					<TableODataRowFields
						fields={fields}
						sortName={message.orderBy.member}
						sortDirection={message.orderBy.direction}
						onChange={sortHandle}
					/>
					<TableODataRowFilters
						fields={fields}
						filtersValues={filtersValues}
						filtersOperators={fitlersOperators}
						widgetOptions={filterWdigetOptions}
						onChange={filterHandle}
					/>
				</MuiTableHead>

				<MuiTableBody
					className={clsx(styles.tableBody, classes?.tableBody)}
				>
					{data.length === 0 && (
						<TableRowEmpty
							noDataLabel={noDataLabel}
							colSpan={fields.length}
						/>
					)}

					{data.length > 0 &&
						data.map((dataRow, idx) => (
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
					<TableODataRowPagination
						colSpan={fields.length}
						count={dataCount}
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
