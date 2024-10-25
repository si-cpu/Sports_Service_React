import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamChoose from "./TeamChoose"; // TeamChoose 컴포넌트 임포트
import Modal from "../components/Modal"; // Modal 컴포넌트 임포트
import styled from "styled-components";

const MainPageContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeams, setSelectedTeams] = useState({
    KBO: null,
    MLB: null,
    KLeague: null,
    PremierLeague: null,
    KBL: null,
    NBA: null,
    MENVLeague: null,
    WomenVLeague: null,
  });
  const {
    KBO,
    MLB,
    KLeague,
    PremierLeague,
    KBL,
    NBA,
    MENVLeague,
    WomenVLeague,
  } = selectedTeams;
  // 네비게이션
  const navigate = useNavigate();
  // 모달 열고 닫기
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 이메일 형식 유효성 검사
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

  // 비밀번호 강도 체크
  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length < 8) {
      strength = "비밀번호는 8자 이상이어야 합니다.";
    } else {
      let strengthLevel = 0;
      if (/[A-Z]/.test(password)) strengthLevel++;
      if (/[a-z]/.test(password)) strengthLevel++;
      if (/\d/.test(password)) strengthLevel++;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthLevel++;

      switch (strengthLevel) {
        case 1:
          strength = "약함";
          break;
        case 2:
          strength = "보통";
          break;
        case 3:
          strength = "강함";
          break;
        case 4:
          strength = "매우 강함";
          break;
        default:
          strength = "약함";
      }
    }
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    checkPasswordStrength(passwordValue);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === password);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null);
  };

  // 이메일 중복 체크
  const checkEmailDuplicate = async () => {
    if (!email || isEmailValid === false) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.0.175:8181/member/valid_email",
        { email }
      );
      if (response.data.isDuplicate) {
        setIsEmailValid(false);
        alert("이미 사용 중인 이메일입니다.");
      } else {
        setIsEmailValid(true);
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("이메일 중복 확인 중 오류 발생:", error);
    }
  };

  // 닉네임 중복 체크
  const checkNicknameDuplicate = async () => {
    if (!nickname || isNicknameValid === false) {
      alert("유효한 닉네임을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.0.175:8181/member/valid_id",
        { nick_name: nickname }
      );
      if (response.data.isDuplicate) {
        setIsNicknameValid(false);
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        setIsNicknameValid(true);
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("닉네임 중복 확인 중 오류 발생:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || isEmailValid === false) {
      alert("이메일을 올바르게 입력했는지 확인해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 추가: 선택된 팀이 없으면 경고
    if (Object.keys(selectedTeams).length === 0) {
      alert("팀을 선택해주세요.");
      return;
    }

    postData();
  };

  const postData = async () => {
    const url = "http://192.168.0.175:8181/member/signup";
    const data = {
      email: email,
      password: password,
      nick_name: nickname,
      KBO: KBO ? KBO.num : null,
      MLB: MLB ? MLB.num : null,
      KLeague: KLeague ? KLeague.num : null,
      PremierLeague: PremierLeague ? PremierLeague.num : null,
      KBL: KBL ? KBL.num : null,
      NBA: NBA ? NBA.num : null,
      MENVLeague: MENVLeague ? MENVLeague.num : null,
      WomenVLeague: WomenVLeague ? WomenVLeague.num : null,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    try {
      const response = await axios.post(url, data, config);
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/");
      } else {
        alert("회원가입 실패. 정보를 확인하세요.");
      }
    } catch (err) {
      console.error("회원가입 중 오류 발생: ", err);
    }
  };

  // 팀 선택 핸들러 (onTeamSelect)
  const handleTeamSelect = (team, league) => {
    console.log("선택된 팀: ", team);

    // 선택된 리그와 팀을 selectedTeams에 저장
    setSelectedTeams((prevTeams) => ({
      ...prevTeams,
      [league]: team, // league 이름을 키로 사용하여 팀 정보를 저장
    }));
  };

  // TeamChoose 컴포넌트에서 각 리그 이름을 전달
  <TeamChoose
    closeModal={closeModal}
    onTeamSelect={(team) => handleTeamSelect(team, selectedLeague)}
  />;

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sports Service Sign-Up</h1>
        <p>회원가입을 통해 더 다양한 서비스를 만나보세요</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>이메일 입력</label>
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
            <label>비밀번호 입력</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호 입력 (8~20자)"
              required
            />
          </div>
          <div className="input-group">
            <label>비밀번호 재입력</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호 재입력"
              required
            />
          </div>
          <div className="input-group">
            <label>비밀번호 강도</label>
            <p>{passwordStrength}</p>
          </div>
          {!isPasswordMatch && (
            <p className="error">비밀번호가 일치하지 않습니다.</p>
          )}

          <div className="input-group">
            <label>닉네임 입력</label>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="닉네임 입력 (2글자 이상)"
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

          <button type="button" onClick={openModal}>
            팀 선택
          </button>

          <button type="submit" className="submit-button">
            가입하기
          </button>
        </form>
      </div>

      {/* 모달 추가 */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <TeamChoose closeModal={closeModal} onTeamSelect={handleTeamSelect} />
        </Modal>
      )}
    </div>
  );
};

export default SignUp;
