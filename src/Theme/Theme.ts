/* eslint-disable no-unused-vars */
import { CSSProperties } from "@material-ui/styles";

export interface StyledComponent<ClassMap> {
	className?: string;
	classes?: Partial<Record<keyof ClassMap, string>>;
	style?: CSSProperties;
}
