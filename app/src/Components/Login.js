import React, { useState } from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import {
  BrowserRouter as Router,
  useHistory,
  Route,
  Link,
  Switch,
} from "react-router-dom";
import axios from "axios";

import PrivateRoute from '../utils/PrivateRoute'
import { Register } from "./Register";
import { Dashboard } from './Dashboard' 

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

  const { inputChange, submit, formValues } = props;

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
        console.log("login", res);
        localStorage.setItem("token", res.data.token);
        console.log(localStorage)
        history.push("/dashboard");
      })
      .catch((err) => err);
  };

  return (
    <div className={classes.paper}>
      <h4>Login</h4>
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
      </form>
      <Router>
        <Switch>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
    </Router>
      {/* <Router>
      <Link to="/signup">Don't have an account?</Link>
      <Switch>
        <Route path="/signup">
          <Register
            inputChange={inputChange}
            submit={submit}
            formValues={formValues}
          />
        </Route>
      </Switch>
      </Router> */}
    </div>
  );
};
