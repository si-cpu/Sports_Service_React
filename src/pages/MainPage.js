import React, { useState } from "react";
import "../css/MainPage.css";
import boardList from "../pages/BoardList";

const MainPage = () => {
  return (
    <div className="main-page">
      <section className="main-pagetoday-matches">
        경기{/* 경기 버튼 */}
      </section>

      <section className="main-page-content-grid">
        <section className="main-page-news">{/* <News /> */}뉴스</section>
        <section className="main-page-myTeam">
          {<div>내 팀 정보 표시</div>}
        </section>
        <section className="main-page-board">
          <boardList />
          게시판
        </section>
      </section>
    </div>
  );
};

export default MainPage;
