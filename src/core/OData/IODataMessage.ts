/* eslint-disable no-unused-vars */
import { IMessage } from "../Message";
import ODataOrderBy from "./ODataOrderBy";
import ODataSelect from "./ODataSelect";
import ODataFilter from "./ODataFilter";

export interface IODataMessage extends IMessage {
	top: number;
	distinct: boolean;
	filter: ODataFilter;
	orderBy: ODataOrderBy;
	select: ODataSelect;
	skip: number;
}
