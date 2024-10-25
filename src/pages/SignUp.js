import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TeamChoose from "./TeamChoose";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); // 비밀번호 강도 메시지
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const LegueData = {
    1: {
      name: "야구",
      subAreas: [
        { num: 5, name: "KBO" },
        { num: 6, name: "MLB" },
      ],
    },
    2: {
      name: "축구",
      subAreas: [
        { num: 7, name: "K 리그" },
        { num: 8, name: "Premier 리그" },
      ],
    },
    3: {
      name: "농구",
      subAreas: [
        { num: 9, name: "KBL" },
        { num: 10, name: "NBA" },
      ],
    },
    4: {
      name: "배구",
      subAreas: [
        { num: 11, name: "남자 배구" },
        { num: 12, name: "여자 배구" },
      ],
    },
  };
  const TeamData = {
    5: {
      name: "KBO",
      subAreas: [
        { num: 13, name: "기아 타이거즈" },
        { num: 14, name: "삼성 라이온즈" },
        { num: 15, name: "LG 트윈스" },
        { num: 16, name: "두산 베어스" },
        { num: 17, name: "KT 위즈" },
        { num: 18, name: "SSG 랜더스" },
        { num: 19, name: "롯데 자이언츠" },
        { num: 20, name: "한화 이글스" },
        { num: 21, name: "NC 다이노스" },
        { num: 22, name: "키움 히어로즈" },
      ],
    },
    6: {
      name: "MLB",
      subAreas: [
        { num: 23, name: "애틀랜타 브레이브스" },
        { num: 24, name: "마이애미 말린스" },
        { num: 25, name: "뉴욕 매츠" },
        { num: 26, name: "필라델피아 필리스" },
        { num: 27, name: "워싱턴 내셔널스" },
        { num: 28, name: "시카고 컵스" },
        { num: 29, name: "신시내티 레즈" },
        { num: 30, name: "밀워키 브루어스" },
        { num: 31, name: "피츠버그 파이리츠" },
        { num: 32, name: "세인트루이스 카디널스" },
        { num: 33, name: "애리조나 다이아몬드백스" },
        { num: 34, name: "콜로라도 로키스" },
        { num: 35, name: "로스엔젤레스 다저스" },
        { num: 36, name: "샌디에이고 파드리스" },
        { num: 37, name: "샌프란시스코 자이언츠" },
        { num: 38, name: "볼티모어 오리올스" },
        { num: 39, name: "보스턴 레드삭스" },
        { num: 40, name: "뉴욕 양키스" },
        { num: 41, name: "템파베이 레이스" },
        { num: 42, name: "토론토 블루제이스" },
        { num: 43, name: "시카고 화이트 삭스" },
        { num: 44, name: "클리블랜드 가디언스" },
        { num: 45, name: "디트로이트 타이거스" },
        { num: 46, name: "캔자스시티 로열스" },
        { num: 47, name: "미네소타 트윈스" },
        { num: 48, name: "휴스턴 에스트로스" },
        { num: 49, name: "로스엔젤레스 에인절스" },
        { num: 50, name: "오클랜드 디 애슬레틱스" },
        { num: 51, name: "시애틀 매리너스" },
        { num: 52, name: "텍사스 레인저스" },
      ],
    },
    7: {
      name: "K 리그",
      subAreas: [
        { num: 53, name: "강원 FC" },
        { num: 54, name: "광주 FC" },
        { num: 55, name: "김천 상무 FC" },
        { num: 56, name: "대구 FC" },
        { num: 57, name: "대전 하나 시티즌" },
        { num: 58, name: "FC 서울" },
        { num: 59, name: "수원 FC" },
        { num: 60, name: "울산 HD FC" },
        { num: 61, name: "인천 유나이티드 FC" },
        { num: 62, name: "전북 현대 모터스" },
        { num: 63, name: "제주 유나이티드 FC" },
        { num: 64, name: "포항 스틸러스" },
      ],
    },
    8: {
      name: "Premier 리그",
      subAreas: [
        { num: 65, name: "리버풀" },
        { num: 66, name: "맨시티" },
        { num: 67, name: "아스널" },
        { num: 68, name: "애스턴 빌라" },
        { num: 69, name: "브라이튼" },
        { num: 70, name: "첼시" },
        { num: 71, name: "토트넘" },
        { num: 72, name: "노팅엄" },
        { num: 73, name: "뉴캐슬" },
        { num: 74, name: "풀럼" },
        { num: 75, name: "본머스" },
        { num: 76, name: "맨유" },
        { num: 77, name: "브렌트포드" },
        { num: 78, name: "레스터 시티 FC" },
        { num: 79, name: "웨스트햄" },
        { num: 80, name: "에버턴" },
        { num: 81, name: "입스위치 타운" },
        { num: 82, name: "크리스탈 펠리스" },
        { num: 83, name: "사우샘스턴" },
        { num: 84, name: "울버햄튼" },
      ],
    },
    9: {
      name: "KBL",
      subAreas: [
        { num: 85, name: "창원 LG" },
        { num: 86, name: "원주 DB" },
        { num: 87, name: "서울 SK" },
        { num: 88, name: "고양 소노" },
        { num: 89, name: "수원 KT" },
        { num: 90, name: "부산 KCC" },
        { num: 91, name: "울산 현대모비스" },
        { num: 92, name: "대구 한국가스공사" },
        { num: 93, name: "안양 정관장" },
        { num: 94, name: "서울 삼성" },
      ],
    },
    10: {
      name: "NBA",
      subAreas: [
        { num: 95, name: "보스턴 셀틱스" },
        { num: 96, name: "브루클린 네츠" },
        { num: 97, name: "뉴욕 닉스" },
        { num: 98, name: "필라델피아 세븐티식서스" },
        { num: 99, name: "토론토 랩터스" },
        { num: 100, name: "시카고 불스" },
        { num: 101, name: "클리블랜드 캐벌리어스" },
        { num: 102, name: "디트로이트 피스톤즈" },
        { num: 103, name: "인디애나 페이서스" },
        { num: 104, name: "밀워키 벅스" },
        { num: 105, name: "애틀랜타 호크스" },
        { num: 106, name: "샬롯 호네츠" },
        { num: 107, name: "마이애미 히트" },
        { num: 108, name: "올랜도 매직" },
        { num: 109, name: "워싱턴 위저즈" },
        { num: 110, name: "댈러스 매버릭스" },
        { num: 111, name: "휴스턴 로키츠" },
        { num: 112, name: "멤피스 그리즐리스" },
        { num: 113, name: "뉴올리언스 팰리컨스" },
        { num: 114, name: "샌안토니오 스퍼스" },
        { num: 115, name: "댄버 너기츠" },
        { num: 116, name: "미네소타 팀버울브스" },
        { num: 117, name: "오클라흐마시티 선더" },
        { num: 118, name: "포틀랜드 트레일블레이저스" },
        { num: 119, name: "유타 재즈" },
        { num: 120, name: "골든스테이트 워리어스" },
        { num: 121, name: "로스엔젤레스 클리퍼스" },
        { num: 122, name: "로스엔젤레스 레이커스" },
        { num: 123, name: "피닉스 선즈" },
        { num: 124, name: "세크라멘토 킹스" },
      ],
    },
    11: {
      name: "남자배구",
      subAreas: [
        { num: 125, name: "인천 대한항공 점보스" },
        { num: 126, name: "천안 현대캐피탈 스카이워커스" },
        { num: 127, name: "수원 한국전력 VIXTORM" },
        { num: 128, name: "서울 우리카드 우리WON" },
        { num: 129, name: "안산 OK저축은행 읏맨" },
        { num: 130, name: "의정부 KB손해보험 스타즈" },
        { num: 131, name: "대전 삼성화재 블루팡스" },
      ],
    },
    12: {
      name: "여자배구",
      subAreas: [
        { num: 132, name: "한국도로공사 하이패스" },
        { num: 133, name: "흥국생명 핑크스파이더스" },
        { num: 134, name: "현대건설 힐스테이트" },
        { num: 135, name: "정관장 레드 스파크스" },
        { num: 136, name: "GS칼텍스 서울 Kixx" },
        { num: 137, name: "IBK 기업은행 알토스" },
        { num: 138, name: "페퍼저축은행 AI PEPPERS" },
      ],
    },
  };
  // 이메일 형식 유효성 검사 정규 표현식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 입력 처리 함수
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // 이메일 형식 검토
    if (!emailRegex.test(emailValue)) {
      setIsEmailValid(false);
      setEmailError("유효하지 않은 이메일 형식입니다.");
    } else {
      setIsEmailValid(null); // 중복 확인을 위해 초기화
      setEmailError(""); // 에러 메시지 초기화
    }
  };

  // 비밀번호 강도 체크 함수
  const checkPasswordStrength = (password) => {
    let strength = "";

    if (password.length < 8) {
      strength = "비밀번호는 8자 이상이어야 합니다.";
    } else {
      let strengthLevel = 0;
      if (/[A-Z]/.test(password)) strengthLevel++; // 대문자 포함
      if (/[a-z]/.test(password)) strengthLevel++; // 소문자 포함
      if (/\d/.test(password)) strengthLevel++; // 숫자 포함
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthLevel++; // 특수문자 포함

      // 비밀번호 강도 레벨에 따른 메시지
      switch (strengthLevel) {
        case 1:
          strength = "약함";
          alert("비밀번호 강도가 약합니다. 강한 비밀번호를 입력하세요.");
          return;
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
          alert("비밀번호 강도가 약합니다. 강한 비밀번호를 입력하세요.");
          return;
      }
    }
    setPasswordStrength(strength);
  };

  // 비밀번호 입력 처리 함수
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    checkPasswordStrength(passwordValue); // 비밀번호 강도 체크 호출
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === password);
  };

  // 닉네임 입력 처리 함수
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null); // 중복 확인을 위해 초기화
  };

  // 종목 선택 처리 함수
  const handleEventChange = (event) => {
    setSelectedEvent(event.target.value);
    setSelectedLeague(""); // 리그 선택 초기화
    setSelectedTeam(""); // 팀 선택 초기화
    setFeedback("");
  };

  // 리그 선택 처리 함수
  const handleLeagueChange = (event) => {
    setSelectedLeague(event.target.value);
    setSelectedTeam(""); // 팀 선택 초기화
    setFeedback("");
  };

  // 팀 선택 처리 함수
  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
  };

  // 이메일 중복 체크 함수
  const checkEmailDuplicate = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }

    if (isEmailValid === false) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }
  };
  // 닉네임 중복 체크 함수
  const checkNicknameDuplicate = async () => {
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }

    if (isNicknameValid === false) {
      alert("유효하지 않은 닉네임입니다.");
      return;
    }

    try {
      const response = await axios.post("/api/check-nickname", {
        nickname: nickname, // POST 요청에 보낼 데이터
      });

      const data = response.data; // 응답 데이터 추출

      if (data.isDuplicate) {
        setIsNicknameValid(false);
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        setIsNicknameValid(true);
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 폼 제출 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEmailValid === false || !email) {
      alert("이메일을 올바르게 입력했는지 확인해주세요.");
      return;
    }

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!selectedEvent || !selectedLeague) {
      setFeedback("종목과 리그를 모두 선택해주세요.");
      return;
    }

    // 가입 처리 로직
    console.log("회원가입 정보:", {
      email,
      password,
      nickname,
      selectedEvent,
      selectedLeague,
      selectedTeam,
    });
  };

  const subLeagues = selectedEvent ? LegueData[selectedEvent].subAreas : [];
  const teams = selectedLeague ? TeamData[selectedLeague].subAreas : [];

  const postData = async () => {
    const url = "http://192.168.0.175:8181/member/register";
    const data = {
      email: email,
      password: password,
      nick_name: nickname,
      SelectedTeam: selectedTeam,
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
      console.log("success: ", response.data.success);

      if (response.status === "성공") {
        // 성공 처리
        console.log("Registration successful!", response.data);
        alert("로그인 성공!");
        navigate("/");
        // Do something with the response, like navigate to another page or update the UI
      } else {
        // 서버에서 성공하지 않았다는 응답을 받은 경우 처리
        console.error("Registration failed: ", response.data.message);
        alert("닉네임과 비밀번호를 확인해주세요!");
        // Show error message to the user
      }
    } catch (err) {
      // 네트워크 에러나 기타 에러 처리
      console.error("Error during registration: ", err);
      // Show error message to the user
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Sports Service Sign-Up</h1>
        <button onClick={navigate(TeamChoose)}>팀선택</button>
        <p>
          회원가입
          <br />
          가입을 통해 더 다양한 서비스를 만나보세요
        </p>
        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
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

          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label>비밀번호 입력</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호 입력 (8~20자)"
              required
            />

            {/* 비밀번호 재입력 */}
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
          </div>

          {/* 비밀번호 강도 표시 */}
          <div className="input-group">
            <label>비밀번호 강도</label>
            <p>{passwordStrength}</p>
          </div>

          {!isPasswordMatch && (
            <p className="error">비밀번호가 일치하지 않습니다.</p>
          )}

          {/* 닉네임 입력 및 중복확인 */}
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

          <div className="input-group">
            <label htmlFor="event-select">종목 선택:</label>
            <select
              id="event-select"
              value={selectedEvent}
              onChange={handleEventChange}
            >
              <option value="">-선택-</option>
              <option value="1">야구</option>
              <option value="2">축구</option>
              <option value="3">농구</option>
              <option value="4">배구</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="league-select">리그 선택:</label>
            <select
              id="league-select"
              value={selectedLeague}
              onChange={handleLeagueChange}
              disabled={!selectedEvent}
            >
              <option value="">-선택-</option>
              {subLeagues.map((league) => (
                <option key={league.num} value={league.num}>
                  {league.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="team-select">팀 선택:</label>
            <select
              id="team-select"
              value={selectedTeam}
              onChange={handleTeamChange}
              disabled={!selectedLeague}
            >
              <option value="">-선택-</option>
              {teams.map((team) => (
                <option key={team.num} value={team.num}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          {feedback && <p className="feedback">{feedback}</p>}

          {/* 기타 필드 및 폼 제출 버튼 */}
          <button type="submit" className="submit-button" onClick={postData}>
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
