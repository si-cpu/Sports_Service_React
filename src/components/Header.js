import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SignIn from "./SignIn";
import { FaUser, FaBars } from "react-icons/fa";
import AuthContext from "../auth-context"; // AuthContext 가져오기

const Header = () => {
  const { isLoggedIn, userName, login, logout } = useContext(AuthContext); // AuthContext 사용
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Logo" />
            <span className="header-title">Sports Service Test</span>
          </Link>
        </div>
        <div className="header-right">
          {isLoggedIn ? (
            <>
              <button onClick={logout} className="icon-button logout-button">
                로그아웃
              </button>
              <Link to="/account/modify" className="icon-button">
                정보 수정
              </Link>
              <span>환영합니다, {userName}!</span>
            </>
          ) : (
            <button onClick={openModal} className="icon-button login-button">
              <FaUser />
              <span>로그인</span>
            </button>
          )}
          {isModalOpen && <SignIn onClose={closeModal} onLoginSuccess={login} />}
          <button className="icon-button menu-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
      </header>
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
