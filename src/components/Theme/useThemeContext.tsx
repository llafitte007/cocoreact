/* eslint-disable no-unused-vars */
import { useContext } from "react";

import ThemeContext, { IThemeContext } from "./ThemeContext";

const useThemeContext = (): IThemeContext => {
	return useContext(ThemeContext);
};

export default useThemeContext;
