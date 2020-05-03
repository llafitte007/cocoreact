import React from "react";
import { SvgIcon, CircularProgress } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import InfoIcon from "@material-ui/icons/Info";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import PreviousIcon from "@material-ui/icons/ArrowBack";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import CheckedIcon from "@material-ui/icons/CheckCircle";
import UnCheckedIcon from "@material-ui/icons/CheckCircleOutline";
import ClockIcon from "@material-ui/icons/Alarm";
import ClockOffIcon from "@material-ui/icons/AlarmOff";
import AddImageIcon from "@material-ui/icons/AddPhotoAlternate";
import TimelineIcon from "@material-ui/icons/Timeline";
import ContactIcon from "@material-ui/icons/ContactMail";
import SendIcon from "@material-ui/icons/Send";
import LockIcon from "@material-ui/icons/LockOutlined";
import AccountIcon from "@material-ui/icons/AccountCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import ToggleOffIcon from "@material-ui/icons/ToggleOff";
import DescriptionIcon from "@material-ui/icons/Description";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import BrightnessIcon from "@material-ui/icons/BrightnessMedium";
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

export { CircularProgress };

export {
	MenuIcon,
	InfoIcon,
	AddIcon,
	SaveIcon,
	EditIcon,
	CloseIcon,
	SearchIcon,
	PreviousIcon,
	SettingsIcon,
	ArchiveIcon,
	UnarchiveIcon,
	CheckedIcon,
	UnCheckedIcon,
	ClockIcon,
	ClockOffIcon,
	AddImageIcon,
	TimelineIcon,
	ContactIcon,
	SendIcon,
	LockIcon,
	AccountIcon,
	CheckedIcon as SuccessIcon,
	WarningIcon,
	ErrorIcon,
	LogoutIcon,
	ToggleOnIcon,
	ToggleOffIcon,
	DescriptionIcon,
	InvertColorsIcon,
	BrightnessIcon,
	SearchIcon as ContainsIcon,
	EqualIcon,
	NotEqualIcon,
	LessThanIcon,
	LessThanOrEqualIcon,
	GreaterThanIcon,
	GreaterThanOrEqualIcon
};
