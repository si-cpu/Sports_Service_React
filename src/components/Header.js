// src/components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import SignIn from "./SignIn";
import { FaUser, FaBars } from "react-icons/fa";

const Header = () => {
    // 사이드바 클릭 액션
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

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
                    {/* Login Button */}
                    <button onClick={openModal} className="icon-button login-button">
                        <FaUser />
                        <span>로그인</span>
                    </button>

                    {/* Conditionally render the LoginModal */}
                    {isModalOpen && <SignIn onClose={closeModal} />}

                    {/* Menu Button */}
                    <button className="icon-button menu-button" onClick={toggleSidebar}>
                        <FaBars />
                    </button>
                </div>
            </header>

            {/* Sidebar: Appears on the right when toggled */}
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
