import {  createContext, useContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [contextTheme, setContextTheme] = useState("light");
  const values = {
    contextTheme,
    setContextTheme,
  };
  return (
    <ThemeContext.Provider value={values}>
      <div className={contextTheme} id='theme-transition'>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
}