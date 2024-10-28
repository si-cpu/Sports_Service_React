import React, { useState } from "react";
import "../css/MainPage.css";

const MainPage = () => {
    return (
        <div className="main-page">
            <section className="today-matches">{/* 경기 버튼 */}</section>

            <section className="content-grid">
                <section className="news">{/* <News /> */}</section>
                <section className="myTeam">{<div>내 팀 정보 표시</div>}</section>
            </section>

            <button>로그인</button>
        </div>
    );
};

export default MainPage;
