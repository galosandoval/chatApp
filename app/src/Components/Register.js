import React, { useState, useEffect } from "react";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import FormSchema from "./FormSchema";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
}));

export const Register = (props) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const { inputChange, submit, formValues, creds } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
    history.push("/dashboard");
    localStorage.setItem('member_id', creds.username)
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    inputChange(name, value);
  };

  useEffect(() => {
    FormSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);
  return (
    <div>
          <form className={classes.paper} onSubmit={handleSubmit}>
            <TextField
              value={formValues.username}
              onChange={handleInputChange}
              required
              id="filled-required"
              label="Username"
              variant="filled"
              name="username"
            />
            <TextField
              value={formValues.password}
              onChange={handleInputChange}
              required
              id="filled-password-input"
              label="Password"
              type="password"
              variant="filled"
              name="password"
            />
            <TextField
              value={formValues.passwordConfirmation}
              onChange={handleInputChange}
              required
              id="filled-password-input"
              type="password"
              label="Re-enter Password"
              variant="filled"
              name="passwordConfirmation"
            />
            <Button type="submit" variant="contained" disabled={disabled}>
              Sign Up
            </Button>
          </form>
    </div>
  );
};
