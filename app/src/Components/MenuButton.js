import React, { useState } from "react";
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
  },
}));

export const MenuButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
    localStorage.clear()
    history.push('/')
  };

  return (
    <div>
      <Button
        className={classes.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Button onClick={handleOpen}>Log Out</Button>
        </MenuItem>
      </Menu>
    </div>
  );
};
