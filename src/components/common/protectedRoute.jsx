import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from '../../services/authService'
import routesName from "../../utils/routesName";
import AuthenticationPage from "../../pages/authentication";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: routesName.authentication, state: { from: props.location } }}
            />
          );
        else if(auth.getCurrentUser().role !== 'Admin' )
            return (
              <Route path={routesName.authentication} component={AuthenticationPage} />
            )
        return Component ? <Component {...props} /> : render(props);
      }}  
    />
  );
};

export default ProtectedRoute;