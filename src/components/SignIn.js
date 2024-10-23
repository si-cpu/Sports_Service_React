import React from "react";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const signupPage = () => {
    navigate("/SignUp");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>로그인</h2>
        {/* Here you would put your login form */}
        <form>
          <div>
            <label>Username:</label>
            <input type="email" placeholder="이메일 입력" required />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="비밀번호 입력"
              name="password"
            />
          </div>
          <button type="submit">Login</button>
          <button className="signup" onClick={signupPage}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
