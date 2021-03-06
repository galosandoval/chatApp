import React, { useState } from "react";
import { TextField, makeStyles, Button, Typography } from "@material-ui/core";
import {
  BrowserRouter as Router,
  useHistory,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import axios from "axios";

import { Register } from "./Register";

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
  },
}));

const initialState = {
  username: "",
  password: "",
};

export const Login = (props) => {
  const classes = useStyles();
  const [creds, setCreds] = useState(initialState);
  const history = useHistory();

  const { inputChange, submit, formValues, saveToLocalStorage } = props;


  const handleChange = (e) => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios
      .post("https://planner-be.herokuapp.com/api/login", creds)
      .then((res) => {
        saveToLocalStorage(res.data.username, res.data.id)
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      })
      .catch((err) => err);
  };

  return (
    <div className={classes.paper}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Typography variant="h5">Login</Typography>
            <form onSubmit={login}>
              <TextField
                variant="outlined"
                name="username"
                type="text"
                label="Username"
                value={creds.username}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                name="password"
                type="password"
                label="Password"
                value={creds.password}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" type="submit">
                Log In
              </Button>
              <br></br>
              <Link to="/register">Don't Have an Account?</Link>
            </form>
          </Route>

          <Route exact path="/register">
            <Register
              formValues={formValues}
              inputChange={inputChange}
              submit={submit}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
