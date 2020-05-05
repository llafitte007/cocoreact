/* eslint-disable no-unused-vars */
import React from "react";

import ThemeContext, { IThemeContext } from "./ThemeContext";

const useThemeContext = (): IThemeContext => {
	return React.useContext(ThemeContext);
};

export default useThemeContext;
