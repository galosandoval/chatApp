import React from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'
import axios from 'axios'

import FormSchema from './FormSchema'

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




export const Register = () => {
  const classes = useStyles();


  
  const inputChange = (name, value) => {
    yup
      .reach(FormSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const submit = () => {
    const newUser = {
      username: formValues.username.trim(),
      password: formValues.password.trim(),
    };
    postNewUser(newUser);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
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
  )
}