import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
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
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const history = useHistory();


  const saveToLocalStorage = (username, id) => {
    localStorage.setItem("username", username);
    localStorage.setItem("member_id", id);
  };

  const postNewUser = (newUser) => {
    axios
      .post("https://planner-be.herokuapp.com/api/register", newUser)
      .then((res) => {
        axios
          .get(`https://planner-be.herokuapp.com/member/${res.data.data.id}`)
          .then((response) => {
            setCurrentUser([response.data.user]);
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMembers = () => {
    axios
      .get("https://planner-be.herokuapp.com/member")
      .then((res) => setMembers(res.data.members))
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
    saveToLocalStorage(currentUser[0].username, currentUser[0].id)
    console.log("heres currentUser", currentUser)
    axios
      .post("https://planner-be.herokuapp.com/api/login", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setFormValues(initialFormValues);
        history.push("/dashboard");
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

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
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            saveToLocalStorage={saveToLocalStorage}
          />
        </Route>
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Switch>
    </div>
  );
}

export default App;
