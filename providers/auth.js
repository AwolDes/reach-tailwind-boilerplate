import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext({});

// Unfortunately this data cannot be persisted in local storage
// AuthProvider in this case will simply have the wallet object from reach
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const setAuthData = (data) => {
    setAuth({ ...data });
  };

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
