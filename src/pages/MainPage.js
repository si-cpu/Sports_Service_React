import React, { useState } from "react";
import "./MainPage.css";
import BoardList from "./BoardList";
import SignIn from "../components/SignIn"; // 로그인 모달 컴포넌트
import Header from "../components/Header"; // 헤더 컴포넌트
import { useContext } from "react";
import AuthContext from "../auth-context"; // AuthContext 가져오기

const MainPage = () => {
  const { login } = useContext(AuthContext); // AuthContext에서 login 함수 가져오기
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태

  const handleLogout = () => {
    login(false); // 로그아웃 처리
    alert("로그아웃되었습니다.");
  };

  return (
    <div className="main-page">
      <Header handleLogout={handleLogout} />

      <section className="today-matches">
        {/* 경기 버튼 예시 */}
        <button className="match-button">
          <div className="league-name">KBO</div>
          <div className="match-details">
            <div className="team">
              <img src="/logos/KBO.png" alt="삼성" className="team-logo" />
              <span className="team-name">삼성</span>
            </div>
            <div>
              <div className="vs">VS</div>
              <div className="match-time">18:30 예정</div>
            </div>
            <div className="team">
              <img src="/logos/KL.png" alt="KIA" className="team-logo" />
              <span className="team-name">KIA</span>
            </div>
          </div>
        </button>
        {/* 추가적인 경기 버튼을 여기에 넣을 수 있습니다 */}
      </section>

      <section className="content-grid">
        <section className="news">
          {/* 뉴스 콘텐츠 */}
        </section>
        <section className="myTeam">
          {/* 사용자 정보 표시 */}
        </section>

        <section className="board">
          <BoardList />
        </section>
      </section>

      <button onClick={() => setIsLoginModalOpen(true)}>로그인</button>

      {isLoginModalOpen && (
        <SignIn
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={() => {
            login(true); // 로그인 성공 시 상태 업데이트
            setIsLoginModalOpen(false); // 모달 닫기
          }}
        />
      )}
    </div>
  );
};

export default MainPage;
