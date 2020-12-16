import React, { useState, useEffect } from "react";
// import { Router } from "@reach/router";
import {
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

import "./App.css";
import { Dashboard } from "./Components/Dashboard";
import { NavBar } from "./Components/NavBar";
import { Login } from "./Components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import FormSchema from "./Components/FormSchema";

const initialFormValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [members, setMembers] = useState([])

  const history = useHistory();

  const postNewUser = (newUser) => {
    axios
      .post("https://planner-be.herokuapp.com/api/register", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setFormValues(initialFormValues);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMembers = () => {
    axios
    .get('https://planner-be.herokuapp.com/member')
    .then(res => setMembers(res.data.members))
    .catch(err => {
      console.log(err)
    })
  }

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

  useEffect(() => {
    getMembers()
  },[])

  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <NavBar />
          <Login
            formValues={formValues}
            inputChange={inputChange}
            submit={submit}
            members={members}
          />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </div>
  );
}

export default App;
