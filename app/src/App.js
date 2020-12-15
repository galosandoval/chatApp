import React, { useState } from "react";
// import { Router } from "@reach/router";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Link,
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

  return (
      <div className="App">
        <NavBar />

            <Login
              formValues={formValues}
              inputChange={inputChange}
              submit={submit}
            />

      </div>
 
  );
}

export default App;
