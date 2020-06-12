/* eslint-disable no-unused-vars */
import { CSSProperties } from "@material-ui/styles";

export interface ClassesStyledComponent<ClassMap> {
	classes?: Partial<Record<keyof ClassMap, string>>;
}

export interface StyledComponent<ClassMap>
	extends ClassesStyledComponent<ClassMap> {
	className?: string;
	style?: CSSProperties;
}
