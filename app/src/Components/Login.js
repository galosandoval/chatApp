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

  const { inputChange, submit, formValues, members } = props;

  const findMemberId = (username) => {
    if (members) {
      const foundMember = members.filter((member) => member.username === username);
      if (foundMember.length > 0) {
        localStorage.setItem('member_id', foundMember[0].id)
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name) {
      setCreds({
        ...creds,
        [e.target.name]: e.target.value,
      });
    } else {
      setCreds(...formValues)
    }
    localStorage.setItem("username", creds.username);
    findMemberId(creds.username)
  };
  
  const login = (e) => {
    e.preventDefault();
    axios
    .post("https://planner-be.herokuapp.com/api/login", creds)
    .then((res) => {
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
              findMemberId={findMemberId}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
