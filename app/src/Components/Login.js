import React, {useState} from "react";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { NavLink, useHistory, Route } from 'react-router-dom'
import axios from 'axios'

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

export const Login = () => {
  const classes = useStyles();
  const [creds, setCreds] = useState(initialState);
  const history = useHistory();

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
        history.push("/dashboard");
      })
      .catch((err) => err);
  };

  // Event listeners

  function changeColor(e) {
    e.target.style.color = "#000099";
  }

  function changeColorBack(e) {
    e.target.style.color = "black";
  }

  return (
    <div className={classes.paper}>
      <Route path="/">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </Route>
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
        <div
          className="makeLink"
          onClick={() => history.push("/signup")}
          onMouseOver={changeColor}
          onMouseOut={changeColorBack}
        >
          Don't have an account? Click to sign up.
        </div>
      </form>
    </div>
  );
};
