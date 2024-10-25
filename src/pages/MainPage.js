import React, { useState } from "react";
import News from "./NewsList";
import "./MainPage.css";
import BoardList from "./BoardList";
import SignIn from "../components/SignIn"; // 로그인 모달 컴포넌트
import Header from "../components/Header"; // 헤더 컴포넌트

const MainPage = () => {
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 상태
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // 로그인 모달 상태

  const handleLogout = () => {
    setCurrentUser(null); // 로그아웃 시 사용자 정보 초기화
    alert("로그아웃되었습니다.");
  };

  return (
    <div className="main-page">
      <Header currentUser={currentUser} handleLogout={handleLogout} />

      <section className="today-matches">{/* 경기 버튼 */}</section>

      <section className="content-grid">
        <section className="news">
          <News />
        </section>
        <section className="myTeam">
          {currentUser && <div>내 팀 정보 표시</div>}
        </section>

        <section className="board">
          <BoardList currentUser={currentUser} />
        </section>
      </section>

      {currentUser ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <button onClick={() => setIsLoginModalOpen(true)}>로그인</button>
      )}

      {isLoginModalOpen && (
        <SignIn
          onClose={() => setIsLoginModalOpen(false)}
          setCurrentUser={setCurrentUser}
        />
      )}
    </div>
  );
};

export default MainPage;
