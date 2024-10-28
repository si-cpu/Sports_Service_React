import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BoardWrite from "../components/BoardWrite";
// import BoardDetail from "../components/BoardDetail";
import { useAuth } from "../auth-context";
import "../css/BoardList.css";

const API_URL = "http://localhost:8181/board";

const BoardList = () => {
    const { isLoggedIn, userData, setIsLoggedIn } = useAuth();

    // 게시물 로딩 및 로딩 상태
    const [boardList, setBoardList] = useState([]);
    const [loading, setLoading] = useState(true);

    // 게시물 작성
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const toggleWriteModal = () => {
        setIsWriteModalOpen(!isWriteModalOpen);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedBoard, setSelectedBoard] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("none");

    const getBoardList = async () => {
        try {
            const response = await axios.get(`${API_URL}/find_all`);
            setBoardList(response.data);
        } catch (err) {
            alert("게시글 불러오는데 실패했습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBoardList();
    }, []);

    const increaseViewCount = async (board) => {
        try {
            await axios.post(`${API_URL}/findall/${board.idx}/increaseViewCount`);
            const updatedBoardList = boardList.map((item) =>
                item.idx === board.idx ? { ...item, viewCount: item.viewCount + 1 } : item
            );
            setBoardList(updatedBoardList);
        } catch (err) {
            console.error("조회수 증가 실패:", err);
        }
    };

    const openModal = (board) => {
        increaseViewCount(board);
        setSelectedBoard(board);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBoard(null);
    };

    const addNewPost = (newPost) => {
        setBoardList([newPost, ...boardList]);
    };

    const filteredAndSortedBoardList = useMemo(() => {
        const filtered = boardList.filter((board) =>
            board.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sorted = [...filtered];
        if (sortBy === "views") {
            sorted.sort((a, b) => b.viewCount - a.viewCount);
        } else if (sortBy === "likes") {
            sorted.sort((a, b) => b.likeCount - a.likeCount);
        }

        return sorted;
    }, [boardList, searchQuery, sortBy]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            setSearchQuery(e.target.value);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="board-list-block">
            <h1 className="title">Sports Service 게시글</h1>
            {isLoggedIn && (
                <button className="button" onClick={toggleWriteModal}>
                    글쓰기
                </button>
            )}

            <div>
                <input
                    type="text"
                    className="search-input"
                    placeholder="검색어 입력"
                    value={searchQuery}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search posts"
                />
                <button className="search-button" onClick={() => setSearchQuery(searchQuery)}>
                    검색
                </button>
                <button className="sort-button" onClick={() => setSortBy("views")}>
                    조회수 정렬
                </button>
                <button className="sort-button" onClick={() => setSortBy("likes")}>
                    추천수 정렬
                </button>
            </div>

            <ul className="board-list-ul">
                {filteredAndSortedBoardList.map((board) => (
                    <li key={board.idx} className="board-list-li">
                        <Link to="#" onClick={() => openModal(board)}>
                            <div className="board-item">
                                <section className="idx">글번호: {board.idx}</section>
                                <h2>{board.title}</h2>
                                <p>작성자: {board.writer}</p>
                                <p>내용: {board.content}</p>
                                <p>등록일: {board.reg_date}</p>
                                <p>수정일: {board.mod_date}</p>
                                <p>조회수: {board.viewCount}</p>
                                <p>좋아요 수: {board.likeCount}</p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* {selectedBoard && (
                <BoardDetail
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    board={selectedBoard}
                    currentUser={currentUser}
                />
            )}*/}

            <BoardWrite isWriteModalOpen={isWriteModalOpen} toggleWriteModal={toggleWriteModal} />
        </div>
    );
};

export default BoardList;
