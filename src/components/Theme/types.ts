export interface ClassesStyledComponent<ClassMap> {
	classes?: Partial<Record<keyof ClassMap, string>>;
}

export interface StyledComponent<ClassMap>
	extends ClassesStyledComponent<ClassMap> {
	className?: string;
	style?: React.CSSProperties;
}
