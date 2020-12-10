import React, { useState } from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";

import { MenuButton } from './MenuButton'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export const NavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.title}>
          <Typography variant="h6">ChatApp</Typography>
          <MenuButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};
