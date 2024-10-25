import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import SignIn from "./SignIn";
import { FaUser, FaBars } from "react-icons/fa";
import { useAuth } from "../auth-context";

const Header = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/"); // 로그아웃 후 메인 페이지로 리다이렉션
  };

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
          {currentUser ? (
            <>
              <button
                onClick={handleLogout}
                className="icon-button logout-button"
              >
                로그아웃
              </button>
              <Link to="/account/modify" className="icon-button">
                정보 수정
              </Link>
            </>
          ) : (
            <button onClick={openModal} className="icon-button login-button">
              <FaUser />
              <span>로그인</span>
            </button>
          )}

          {isModalOpen && (
            <SignIn onClose={closeModal} setCurrentUser={setCurrentUser} />
          )}

          <button className="icon-button menu-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
      </header>

      {/* Sidebar */}
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
        <button onClick={toggleSidebar} className="close-button">
          닫기
        </button>
      </div>
    </div>
  );
};

export default Header;
