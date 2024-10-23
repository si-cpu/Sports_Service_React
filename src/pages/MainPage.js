import React from "react";
import NewsSection from "../components/NewsSection";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <section className="today-matches">
        <button className="match-button">
          <div className="league-name">KBO</div>
          <div className="match-details">
            {/* First team */}
            <div className="team">
              <img src="/logos/KBO.png" alt="Samsung" className="team-logo" />
              <span className="team-name">삼성</span>
            </div>
            {/* Match time in the middle */}
            <div>
              <div className="vs">VS</div>
              <div className="match-time">18:30 예정</div>
            </div>
            {/* Second team */}
            <div className="team">
              <img src="/logos/KL.png" alt="KIA" className="team-logo" />
              <span className="team-name">KIA</span>
            </div>
          </div>
        </button>
        <button className="match-button">
          <div className="league-name">KBO</div>
          <div className="match-details">
            {/* First team */}
            <div className="team">
              <img src="/logos/KBO.png" alt="Samsung" className="team-logo" />
              <span className="team-name">삼성</span>
            </div>
            {/* Match time in the middle */}
            <div>
              <div className="vs">VS</div>
              <div className="match-time">18:30 예정</div>
            </div>
            {/* Second team */}
            <div className="team">
              <img src="/logos/KL.png" alt="KIA" className="team-logo" />
              <span className="team-name">KIA</span>
            </div>
          </div>
        </button>
      </section>
      <section className="content-grid">
        <section className="news">
          <NewsSection />
        </section>
        <section className="myTeam"></section>
        <section className="board"></section>
      </section>
    </div>
  );
};
export default MainPage;
