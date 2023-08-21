import React, {
  createContext, useContext, useMemo, useState,
} from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');

  const authContext = useMemo(
    () => ({
      accessToken,
      setAccessToken,
    }),
    [accessToken],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
