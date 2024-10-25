import React, { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 훅 정의
export const useAuth = () => {
  return useContext(AuthContext);
};
