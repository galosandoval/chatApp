import React, {useState} from 'react'
import { NavLink, Route, Switch, useHistory } from 'react-router-dom'
import axios from 'axios'

import "./App.css";
import { Dashboard } from "./Components/Dashboard";
import { NavBar } from "./Components/NavBar";
import { Login } from "./Components/Login";
import PrivateRoute from "./utils/PrivateRoute";

const initialFormValues = {
  username: "",
  password: "",
  passwordConfirmation: "",
};

function App() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);

  const history = useHistory()


  const postNewUser = (newUser) => {
    axios
      .post("https://planner-be.herokuapp.com/api/register", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setFormValues(initialFormValues);
        history.push("/dashboard")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
