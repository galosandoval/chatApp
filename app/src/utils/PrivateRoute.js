import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(localStorage)
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log('its working')
        if (localStorage.getItem('token')) {
          return <Component {...props} />;
        } else {
          console.log('not working')
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
