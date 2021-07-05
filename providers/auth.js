import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

const TOKEN_KEY = 'xbacked-store';

// AuthProvider in this case will simply have the account
// object from connector
const AuthProvider = ({ children }) => {
  const savedData = JSON.parse(localStorage.getItem(TOKEN_KEY)) || null;

  const [auth, setAuth] = useState({
    ...savedData
  });

  const setAuthData = (data) => {
    setAuth({ ...data });
  };

  useEffect(() => {
    setAuth({ ...savedData });
  }, []);
  // 2. if object with key TOKEN_KEY exists in localStorage, we are putting its value in auth.data and we set loading to false.
  // This function will be executed every time component is mounted (every time the user refresh the page);

  // TODO: time this out - maybe using a JWT?
  useEffect(() => {
    // setting to undefined will error, so we return null. I love js :)
    localStorage.setItem(TOKEN_KEY, JSON.stringify(auth) || null);
  }, [auth]);
  // 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key TOKEN_KEY.

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
