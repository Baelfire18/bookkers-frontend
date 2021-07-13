import React, {
  createContext, useEffect, useCallback,
} from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

let logoutTimer;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, storeUser, clearStoredUser] = useLocalStorage('user');
  const [sessionExpDate, storeSessionExpDate, clearSessionExpDate] = useLocalStorage('sessionExpiration');
  const history = useHistory();

  const handleUserLogin = (user) => {
    const expiration = new Date(jwtDecode(user.access_token).exp * 1000);
    storeUser(user);
    storeSessionExpDate(expiration);
  };

  const handleUserLogout = () => {
    clearStoredUser();
    clearSessionExpDate();
    history.push('/');
  };

  const handleAutomaticLogout = useCallback(() => {
    clearStoredUser();
    clearSessionExpDate();
    history.push('/login');
  }, [history]);

  useEffect(() => {
    if (currentUser && sessionExpDate) {
      const remainingTime = new Date(sessionExpDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(handleAutomaticLogout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, sessionExpDate, handleAutomaticLogout]);

  return (
    <AuthContext.Provider value={{ currentUser, handleUserLogin, handleUserLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
