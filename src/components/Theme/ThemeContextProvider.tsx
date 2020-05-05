/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider, Theme } from "@material-ui/core/styles";

import ThemeContext from "./ThemeContext";
import { IThemeStorage } from "./types";

export interface ThemeContextProviderProps {
	defaultName: string;
	themes: Record<string, Theme>;
	children: React.ReactNode | React.ReactNode[];
	storage?: IThemeStorage;
}

export default function ThemeContextProvider({
	defaultName,
	themes,
	children,
	storage
}: ThemeContextProviderProps) {
	const [name, setName] = useState(() => {
		let themeName = storage && storage.get();
		if (themeName !== undefined) {
			// assert stored name is a already valid theme name
			themeName =
				themes[themeName] === undefined ? defaultName : themeName;
		} else {
			themeName = defaultName;
		}
		return themeName;
	});

	const [theme, setTheme] = useState(themes[name]);

	// update theme & storage depending current name
	useEffect(() => {
		storage && storage.set(name);
		setTheme(themes[name]);
	}, [name]);

	const set = useCallback(
		(themeName: string) => {
			if (themes[themeName] === undefined) {
				const themeNames = Object.keys(themes).join(", ");
				throw new Error(
					`unknow theme named ${themeName}, you have choices between [${themeNames}] `
				);
			}
			setName(themeName);
		},
		[setName, themes]
	);

	return (
		<ThemeContext.Provider value={{ set, name, theme }}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
}
