import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get("http://localhost:8181/member/check_login", {
                    withCredentials: true,
                });

                // 로그인 상태 확인
                if (response.status === 200 && response.data) {
                    setIsLoggedIn(true);
                    setUserData(response.data);
                } else {
                    setIsLoggedIn(false);
                    setUserData(null);
                }
            } catch {
                setIsLoggedIn(false);
                setUserData(null);
            } finally {
                setLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    if (loading) {
        return <div></div>;
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, userData, setIsLoggedIn, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

// useAuth 훅 정의
export const useAuth = () => useContext(AuthContext);
