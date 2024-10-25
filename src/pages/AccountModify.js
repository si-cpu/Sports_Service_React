import React, { useState, useEffect } from "react";
import "./AccountModify.css";
import axios from "axios";
import TeamChoose from "./TeamChoose"; // Import TeamChoose component

const AccountModify = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user-profile");
        const data = response.data;
        setEmail(data.email);
        setNickname(data.nickname);
        setSelectedTeams(data.teams);
      } catch (error) {
        setGeneralError("사용자 정보를 불러오는 데 실패했습니다.");
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (!emailRegex.test(emailValue)) {
      setIsEmailValid(false);
      setEmailError("유효하지 않은 이메일 형식입니다.");
    } else {
      setIsEmailValid(null);
      setEmailError("");
    }
  };

  const checkEmailDuplicate = async () => {
    if (!email || isEmailValid === false) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post("/api/check-email", { email });
      setIsEmailValid(!response.data.isDuplicate);
      alert(
        response.data.isDuplicate
          ? "이미 사용 중인 이메일입니다."
          : "사용 가능한 이메일입니다."
      );
    } catch (error) {
      setGeneralError("이메일 중복 확인 중 오류가 발생했습니다.");
      console.error("Error checking email:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    // Assuming a function to evaluate password strength exists
    // setPasswordStrength(evaluatePasswordStrength(passwordValue));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === password);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null);
  };

  const checkNicknameDuplicate = async () => {
    if (!nickname || isNicknameValid === false) {
      alert("유효한 닉네임을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post("/api/check-nickname", { nickname });
      setIsNicknameValid(!response.data.isDuplicate);
      alert(
        response.data.isDuplicate
          ? "이미 사용 중인 닉네임입니다."
          : "사용 가능한 닉네임입니다."
      );
    } catch (error) {
      setGeneralError("닉네임 중복 확인 중 오류가 발생했습니다.");
      console.error("Error checking nickname:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("/api/update-profile", {
        email,
        password,
        nickname,
        teams: selectedTeams,
      });
      if (response.data.success) {
        alert("정보가 성공적으로 수정되었습니다.");
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      setGeneralError("정보 수정 중 오류가 발생했습니다.");
      console.error("Error updating profile:", error);
    }
  };

  const handleTeamSelect = (team, league) => {
    setSelectedTeams((prevTeams) => ({
      ...prevTeams,
      [league]: team,
    }));
  };

  return (
    <div className="account-modify-container">
      <div className="account-modify-box">
        <h1>정보 수정</h1>
        {generalError && <p className="error">{generalError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일 수정</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일 입력"
              required
            />
            <button
              type="button"
              className="check-button"
              onClick={checkEmailDuplicate}
            >
              중복확인
            </button>
          </div>
          {emailError && <p className="error">{emailError}</p>}
          {isEmailValid === true && (
            <p className="success">사용 가능한 이메일입니다.</p>
          )}

          <div className="input-group">
            <label>비밀번호 수정 (원하는 경우만 입력)</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="새 비밀번호 입력 (8~20자)"
            />
          </div>

          <div className="input-group">
            <label>비밀번호 재입력</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="새 비밀번호 재입력"
            />
          </div>
          {!isPasswordMatch && (
            <p className="error">비밀번호가 일치하지 않습니다.</p>
          )}

          <div className="input-group">
            <label>닉네임 수정</label>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임 입력"
              required
            />
            <button
              type="button"
              className="check-button"
              onClick={checkNicknameDuplicate}
            >
              중복확인
            </button>
          </div>

          {isNicknameValid === false && (
            <p className="error">이미 사용 중인 닉네임입니다.</p>
          )}
          {isNicknameValid === true && (
            <p className="success">사용 가능한 닉네임입니다.</p>
          )}

          <button type="button" onClick={() => setIsModalOpen(true)}>
            팀 선택
          </button>

          <button type="submit" className="submit-button">
            정보 수정
          </button>
        </form>
      </div>

      {isModalOpen && (
        <TeamChoose
          onClose={() => setIsModalOpen(false)}
          onTeamSelect={handleTeamSelect}
        />
      )}
    </div>
  );
};

export default AccountModify;
