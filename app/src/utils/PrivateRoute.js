import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(localStorage)
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem("token")) {
          console.log('its working')
          return <Component />;
        } else {
          console.log('not working')
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default PrivateRoute;
