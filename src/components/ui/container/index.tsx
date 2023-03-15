import { FC, ReactNode } from "react";

import { Container as ContainerMUI } from "@mui/material";

export const Container: FC<{ children: ReactNode }> = ({ children }) => <ContainerMUI maxWidth="lg">{children}</ContainerMUI>;
