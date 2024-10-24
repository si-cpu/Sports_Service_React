import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const signupPage = () => {
    navigate("/SignUp");
    onClose();
  };

  const mainPage = () => {
    navigate("/Mainpage");
    onClose();
  };

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = async () => {
      const url = "http://192.168.0.175:8181/member/register";
      const data = {
        nickname: nickname,
        password: password,
      };
    
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
    
      try {
        const response = await axios.post(url, data, config);
        console.log('response: ', response);
        console.log('success: ', response.data.success);
  
      if (response.status) {
        setUser(response.data.user);
        alert("로그인 성공!")
        mainPage();
      } else {
        setError("닉네임과 비밀번호가 유효하지 않습니다.");
      }
    } catch (error) {
      setError("로그인 도중 오류가 발생했습니다. 관리자가 고치는 중입니다.");
    }
  };
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <h1> 만나서 반갑습니다!</h1>
          <h3> 로그인을 진행해주세요!</h3>
          <div>
            <label>닉네임:</label>
            <input
              type="nickname"
              placeholder="닉네임 입력"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
          <button type="button" className="signup" onClick={signupPage}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
