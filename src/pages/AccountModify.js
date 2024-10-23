import React, { useState, useEffect } from "react";
import "./AccountModify.css"; // 별도의 CSS 파일
import axios from "axios";

const AccountModify = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [nickname, setNickname] = useState("");
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedLeague, setSelectedLeague] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

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
        { num: 127, name: "수원 한국전ㄴ력 VIXTORM" },
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

  // 기존 사용자 정보 불러오기 (API 호출 예시)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/user-profile");
        const data = response.data;
        setEmail(data.email);
        setNickname(data.nickname);
        setSelectedTeam(data.team);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(null); // 이메일 입력이 바뀌면 상태 초기화
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsPasswordMatch(e.target.value === password); // 비밀번호 일치 여부 확인
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameValid(null); // 닉네임 입력이 바뀌면 상태 초기화
  };

  const handleEventChange = (e) => setSelectedEvent(e.target.value);

  const handleLeagueChange = (e) => setSelectedLeague(e.target.value);

  const handleTeamChange = (e) => setSelectedTeam(e.target.value);

  // 이메일 중복 확인 함수
  const checkEmailDuplicate = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("유효한 이메일 주소를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("/api/check-email", { email }); // 이메일 중복 확인 API 주소
      const data = response.data;
      if (data.isDuplicate) {
        setIsEmailValid(false); // 중복된 이메일이면 false
        alert("이미 사용 중인 이메일입니다.");
      } else {
        setIsEmailValid(true); // 사용 가능한 이메일이면 true
        alert("사용 가능한 이메일입니다.");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("이메일 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 닉네임 중복 확인 함수
  const checkNicknameDuplicate = async () => {
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }
    try {
      const response = await axios.post("/api/check-nickname", { nickname }); // 닉네임 중복 확인 API 주소
      const data = response.data;
      if (data.isDuplicate) {
        setIsNicknameValid(false); // 중복된 닉네임이면 false
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        setIsNicknameValid(true); // 사용 가능한 닉네임이면 true
        alert("사용 가능한 닉네임입니다.");
      }
    } catch (error) {
      console.error("Error checking nickname:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  };

  // 정보 수정 제출 함수
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordMatch) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (password && !passwordPattern.test(password)) {
      alert("비밀번호는 최소 8자 이상, 숫자와 문자를 포함해야 합니다.");
      return;
    }

    try {
      const response = await axios.post("/api/update-profile", {
        email,
        password,
        nickname,
        team: selectedTeam,
      }); // 정보 수정 API 주소
      const data = response.data;
      if (data.success) {
        alert("정보가 성공적으로 수정되었습니다.");
      } else {
        alert("정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  const subLeagues = selectedEvent ? LegueData[selectedEvent].subAreas : [];
  const teams = selectedLeague ? TeamData[selectedLeague].subAreas : [];

  return (
    <div className="account-modify-container">
      <div className="account-modify-box">
        <h1>정보 수정</h1>
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

          {isEmailValid === false && (
            <p className="error">이미 사용 중인 이메일입니다.</p>
          )}
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

          <button type="submit" className="submit-button">
            정보 수정
          </button>
        </form>
      </div>
    </div>
  );
};
export default AccountModify;
