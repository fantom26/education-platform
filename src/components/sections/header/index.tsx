import { useState } from "react";

import { Menu } from "@mui/icons-material";
import { AppBar, Box, Button, Divider, Drawer, IconButton, Link, List, ListItem, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { Container, Logo } from "components/ui";
import { ICONS, SOCIALS } from "utils/constants";

const drawerWidth = 240;

export const Header = (props: any) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Logo />
      </Typography>
      <Divider />
      <List>
        {SOCIALS.map(({ name, link }) => (
          <ListItem key={name} disablePadding>
            <Link component={RouterLink} to={link}>
              {name}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // eslint-disable-next-line no-undefined
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="static">
        <Container>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <Menu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              <Logo />
            </Typography>
            <Stack direction="row" gap={2} sx={{ display: { xs: "none", sm: "flex" } }}>
              {SOCIALS.map(({ name, link }) => (
                <Button component={RouterLink} to={link} key={name} sx={{ color: "#fff" }} variant="text" startIcon={ICONS[name.toLowerCase()]}>
                  {name}
                </Button>
              ))}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
