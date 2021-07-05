import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../providers/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useContext(AuthContext);
  const { loading } = auth;

  if (loading) {
    return (
      <Route
        {...rest}
        render={() => <p>Loading...</p>}
      />
    );
  }
  // if loading is set to true (when our function useEffect(() => {}, []) is not executed), we are rendering a loading component;

  // Use routeProps to pass roles that can access a route
  // Can also filter for org here
  // Should kick person out if session expired
  return (
    <Route
      {...rest}
      render={routeProps => auth.data ? (
        <Component {...routeProps} />
      ) : (
        <Redirect to="/login" />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
