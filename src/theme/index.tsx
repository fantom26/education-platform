import { FC, ReactNode } from "react";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#f5f5f7"
    },
    info: {
      main: "#06c"
    }
  }
});

interface ThemeProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProps> = (props) => {
  const { children } = props;
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
