import React, { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  const login = () => {
    setIsLoggedIn(true); // 로그인 처리
  };

  const logout = () => {
    setIsLoggedIn(false); // 로그아웃 처리
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// AuthContext 사용 (useAuth 훅 제거)
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
