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

  // TODO: time this out - maybe using a JWT?
  // Maybe only enable in dev only
  // FYI - this does not save the complete object. It will remove functions like deploy
  useEffect(() => {
    // setting to undefined will error, so we return null. I love js :)
    localStorage.setItem(TOKEN_KEY, JSON.stringify(auth) || null);
  }, [auth]);

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
