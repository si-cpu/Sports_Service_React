import React, { useState } from "react";
import "../css/MainPage.css";
import BoardMainPage from "../components/BoaraMainPage";
import News from "./New";

const MainPage = () => {
  return (
    <div className="main-page">
      <section className="content-container">
        <section className="main-page-news">
          {" "}
          <News />
        </section>
        <section className="main-pagetoday-matches">
          경기{/* 경기 버튼 */}
        </section>
        <section className="main-page-myTeam">
          {<div>내 팀 정보 표시</div>}
        </section>
        <section className="main-page-board">
          <BoardMainPage />
        </section>
      </section>
    </div>
  );
};

export default MainPage;
