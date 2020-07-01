import React from "react";
import { SvgIcon } from "@material-ui/core";

import InfoIcon from "@material-ui/icons/Info";
import SuccessIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

import ContainsIcon from "@material-ui/icons/Search";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import EqualIcon from "@material-ui/icons/DragHandle";
import LessThanIcon from "@material-ui/icons/ChevronLeft";
import GreaterThanIcon from "@material-ui/icons/ChevronRight";

// --------------------------------------------------------

function NotEqualIcon(props: any) {
	return (
		<SvgIcon {...props}>
			<path
				d="M19 9.99805H5V7.99805H19V9.99805ZM19 15.998H5V13.998H19V15.998Z"
				fill="currentColor"
			/>
			<path
				d="M14.0801 4.60498L15.9201 5.39498L9.92008 19.395L8.08008 18.605L14.0801 4.60498Z"
				fill="currentColor"
			/>
		</SvgIcon>
	);
}

function LessThanOrEqualIcon(props: any) {
	return (
		<SvgIcon {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.5 15.5L9.25 10L17.5 4.5L16.5 3L6 10L16.5 17L17.5 15.5Z"
				fill="currentColor"
			/>
			<path d="M18 20.998H6V18.998H18V20.998Z" fill="currentColor" />
		</SvgIcon>
	);
}

function GreaterThanOrEqualIcon(props: any) {
	return (
		<SvgIcon {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M6.5 15.5L14.75 10L6.5 4.5L7.5 3L18 10L7.5 17L6.5 15.5Z"
				fill="currentColor"
			/>
			<path d="M18 20.998H6V18.998H18V20.998Z" fill="currentColor" />
		</SvgIcon>
	);
}

export {
	InfoIcon,
	CloseIcon,
	SuccessIcon,
	WarningIcon,
	ErrorIcon,
	ToggleOnIcon,
	ToggleOffIcon,
	ContainsIcon,
	EqualIcon,
	NotEqualIcon,
	LessThanIcon,
	LessThanOrEqualIcon,
	GreaterThanIcon,
	GreaterThanOrEqualIcon
};
