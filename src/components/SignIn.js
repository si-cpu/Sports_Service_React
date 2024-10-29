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
        // resetForm();
        toggleLogin();
        window.location.reload();
      } else {
        alert("로그인 실패");
      }
    } catch (error) {
      alert("다시 로그인 해주세요.");
    }
  };

  return (
    <div className="signIn-modal-overlay" onClick={toggleLogin}>
      <div
        className="signIn-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="signIn-close-button"
          onClick={toggleLogin}
          aria-label="Close modal"
        >
          <MdClose />
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="signIn-title">Login</h2>
          <div>
            <label>
              닉네임
              <input
                className="signIn-nickname-Input"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임 입력"
                required
              />
            </label>
          </div>
          <div>
            <label>
              비밀번호
              <input
                className="signIn-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                required
              />
            </label>
          </div>

          <div>
            <label>
              <input
                className="signIn-autoLogin-checkbox"
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              자동 로그인
            </label>
          </div>

          <div className="log-sign-btn">
            <button className="logIn" type="submit">
              Login
            </button>

            <Link className="signup" to="/signup" onClick={toggleLogin}>
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
