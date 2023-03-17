import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Logo = () => (
  <Link component={RouterLink} to="/" underline="none" sx={{ color: "#fff" }}>
    GENESIS
  </Link>
);
