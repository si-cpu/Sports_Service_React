import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/SignIn.css";

const SignIn = ({ toggleLogin }) => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await postData();
    };

    const postData = async () => {
        const url = "http://localhost:8181/member/login";
        const data = {
            nick_name: nickname,
            password: password,
            auto_login: autoLogin,
        };

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };

        try {
            const response = await axios.post(url, data, config);
            console.log("response: ", response);
            if (response.data === "success") {
                alert("로그인 성공");
                toggleLogin();
                window.location.reload();
            } else {
                alert("로그인 실패");
            }
        } catch (error) {
            alert("다시 로그인 해주세요.");
        }
    };

    const handleKakaoLogin = () => {
        const currentUrl = window.location.href;

        axios
            .get(`http://localhost:8181/kakao/signup`, {
                params: {
                    redirectUri: window.location.origin,
                    auto_login: autoLogin,
                },
            })
            .then((response) => {
                window.location.href = response.data.redirectUri;
            })
            .catch((error) => {
                console.error("Kakao login failed:", error);
            });
    };

    return (
        <div className="modal-overlay" onClick={toggleLogin}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                    className="close-modal-button"
                    onClick={toggleLogin}
                    aria-label="Close modal"
                >
                    <MdClose />
                </button>
                <h2 className="sign-in-title">로그인</h2>
                <form onSubmit={handleSubmit} className="sign-in-form">
                    <div className="input-field">
                        <label htmlFor="nickname">닉네임</label>
                        <input
                            id="nickname"
                            className="nickname-input"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임 입력"
                            required
                        />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            id="password"
                            className="password-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호 입력"
                            required
                        />
                    </div>

                    <div className="auto-login-container">
                        <label className="auto-login-label">
                            <input
                                className="auto-login-checkbox"
                                type="checkbox"
                                checked={autoLogin}
                                onChange={(e) => setAutoLogin(e.target.checked)}
                            />
                        </label>
                        <p className="autoLoginName">자동 로그인</p>
                    </div>

                    <div className="login-signup-button-container">
                        <button className="login-button" type="submit">
                            로그인
                        </button>
                        <button type="button" onClick={handleKakaoLogin}>
                            카카오톡 간편로그인
                        </button>

                        <Link className="signup-button" to="/signup" onClick={toggleLogin}>
                            회원가입
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
