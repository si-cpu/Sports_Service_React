import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";
import AuthContext from "../../src/auth-context";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [autoLogin, setAutoLogin] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset error message when inputs change
    setError("");
  }, [nickname, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postData();
  };

  const postData = async () => {
    const url = "http://localhost:8181/member/login"; // Adjust the URL as needed
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
        setCurrentUser(true); // Update currentUser
        alert("로그인 성공!");
        resetForm(); // Reset form fields
        navigate("/"); // Redirect to the main page
        onClose(); // Close the modal
      } else {
        setError("닉네임과 비밀번호가 유효하지 않습니다.");
      }
    } catch (error) {
      setError("로그인 도중 오류가 발생했습니다. 관리자가 고치는 중입니다.");
    }
  };

  const resetForm = () => {
    setNickname("");
    setPassword("");
    setAutoLogin(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h1>만나서 반갑습니다!</h1>
          <h3>로그인을 진행해주세요!</h3>
          <div>
            <label htmlFor="nickname">닉네임:</label>
            <input
              id="nickname"
              type="text"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">비밀번호:</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              자동 로그인
            </label>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="logIn">
            Login
          </button>
          <button
            type="button"
            className="signup"
            onClick={() => navigate("/SignUp")}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
