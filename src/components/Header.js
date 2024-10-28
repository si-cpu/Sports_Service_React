import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Header.css";
import SignIn from "./SignIn";
import { FaUser, FaBars } from "react-icons/fa";
import { useAuth } from "../auth-context";

const Header = () => {
  const { isLoggedIn, userData, setIsLoggedIn } = useAuth();

  // 사이드바 클릭 액션
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleLogin = () => setIsModalOpen(!isModalOpen);
  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8181/member/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data === "success") {
        alert("로그아웃되었습니다.");
        setIsLoggedIn(false); // 로그아웃 성공 시 상태 업데이트
        console.log("2out");
      } else {
        alert("다시 시도해주세요.");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 오류 발생:", error);
      alert("로그아웃 처리 중 문제가 발생했습니다."); // 사용자에게 알림
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="../assest/league/baseball/KBO.png" alt="Logo" />
            <span className="header-title">Sports Service Test</span>
          </Link>
        </div>

        <div className="header-right">
          {/* 로그인 버튼 */}
          {!isLoggedIn ? (
            <button onClick={toggleLogin} className="icon-button login-button">
              <FaUser />
              <span>로그인</span>
            </button>
          ) : (
            <div className="user-info">
              <span>환영합니다, {userData?.nickName}님</span>
              <button
                onClick={logoutHandler}
                className="icon-button logout-button"
              >
                로그아웃
              </button>
              <Link to="/account/modify" className="icon-button">
                정보 수정
              </Link>
            </div>
          )}

          {isModalOpen && <SignIn toggleLogin={toggleLogin} />}

          {/* 사이드바 */}
          <button className="icon-button menu-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
      </header>

      {/* Sidebar:  */}
      <div className={`sidebar ${isSidebarVisible ? "visible" : ""}`}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={toggleSidebar}>
                메인 페이지
              </Link>
            </li>
            <li>
              <Link to="/game/list" onClick={toggleSidebar}>
                경기 일정
              </Link>
            </li>
            <li>
              <Link to="/board/list" onClick={toggleSidebar}>
                게시판
              </Link>
            </li>
            <li>
              <Link to="/team" onClick={toggleSidebar}>
                팀 상세 보기
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
