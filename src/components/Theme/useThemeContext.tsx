/* eslint-disable no-unused-vars */
import { useContext } from "react";

import ThemeContext, { IThemeContext } from "./ThemeContext";

export default function useThemeContext(): IThemeContext {
	return useContext(ThemeContext);
}
