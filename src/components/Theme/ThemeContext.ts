/* eslint-disable no-unused-vars */
import React from "react";
import { Theme } from "@material-ui/core/styles";

export interface IThemeContext {
	set: (themeName: string) => void;
	name: string;
	theme: Theme;
}

const ThemeContext = React.createContext<IThemeContext>({
	set: () => {
		throw new Error("undefined IThemeContext.info() method");
	},
	name: "undefined",
	theme: {} as Theme
});

export default ThemeContext;
