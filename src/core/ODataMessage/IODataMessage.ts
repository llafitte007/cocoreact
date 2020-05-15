/* eslint-disable no-unused-vars */
import { IMessage } from "../Message";
import { ODataOrderBy, ODataFilter, ODataSelect } from "../OData";

export interface IODataMessage extends IMessage {
	top: number;
	distinct: boolean;
	filter: ODataFilter;
	orderBy: ODataOrderBy;
	select: ODataSelect;
	skip: number;
}
