import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BoardWrite from "../components/BoardWrite";
import BoardComponent from "../components/BoardComponent";
import { useAuth } from "../auth-context";
import "../css/BoardList.css";

const API_URL = "http://localhost:8181";

const BoardList = () => {
  const { isLoggedIn, userData } = useAuth();
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [liked, setLiked] = useState(false);

  const userNickname = userData?.nick_name || "Guest";

  const getBoardList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/board/find_all`);
      console.log("Fetched Board List:", response.data);
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
    const boardNum = board.board_num;
    try {
      await axios.put(`${API_URL}/board/view/${boardNum}`);
      const updatedBoardList = boardList.map((item) =>
        item.board_num === boardNum
          ? { ...item, view_count: item.view_count + 1 }
          : item
      );
      setBoardList(updatedBoardList);
    } catch (err) {
      console.error("조회수 증가 실패:", err);
    }
  };

  const severLikeStatus = async (board) => {
    if (!isLoggedIn) {
      setLiked(false);
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/board/like_status/${board.board_num}`,
        {
          withCredentials: true,
        }
      );
      setLiked(response.data === "success");
    } catch (error) {
      console.error("Error checking like status:", error);
      setLiked(false);
    }
  };

  const openModal = (board) => {
    increaseViewCount(board);
    if (isLoggedIn) {
      severLikeStatus(board);
    }
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoard(null);
    getBoardList(); // Refresh the board list
  };

  const toggleWriteModal = () => {
    setIsWriteModalOpen((prev) => !prev);
  };

  const addNewPost = (newPost) => {
    setBoardList((prev) => [newPost, ...prev]);
  };

  const filteredAndSortedBoardList = useMemo(() => {
    const filtered = boardList.filter((board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sorted = [...filtered];
    if (sortBy === "views") {
      sorted.sort((a, b) => b.view_count - a.view_count);
    } else if (sortBy === "likes") {
      sorted.sort((a, b) => b.good_count - a.good_count);
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
      <h1 className="board-list-title">Sports Service 게시글</h1>
      <section className="button-container">
        {isLoggedIn && (
          <button
            className="board-list-write-button"
            onClick={toggleWriteModal}
          >
            글쓰기
          </button>
        )}
        <input
          type="text"
          className="board-list-search-input"
          placeholder="검색어 입력"
          value={searchQuery}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search posts"
        />
        <button
          className="board-list-view-sort-button"
          onClick={() => setSortBy("views")}
        >
          조회수 정렬
        </button>
        <button
          className="board-list-like-sort-button"
          onClick={() => setSortBy("likes")}
        >
          추천수 정렬
        </button>
      </section>
      <ul className="board-list-ul">
        {filteredAndSortedBoardList.map((board) => (
          <li key={board.board_num} className="board-list-li">
            <Link to="#" onClick={() => openModal(board)}>
              <div className="board-list-item">
                <section className="board-list-idx">
                  No. {board.board_num}
                </section>
                <h2>{board.title}</h2>
                <p className="board-list-writer">작성자: {board.writer}</p>
                <p className="board-list-content">{board.content}</p>
                <p className="board-list-reg_date">등록일: {board.reg_date}</p>
                <p className="board-list-mod_date">수정일: {board.mod_date}</p>
                <p className="board-list-viewCount">
                  조회수: {board.view_count}
                </p>
                <p className="board-list-likeCount">
                  좋아요 수: {board.good_count}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {selectedBoard && (
        <BoardComponent
          isOpen={isModalOpen}
          onClose={closeModal}
          board={selectedBoard}
          writer={isLoggedIn && userData ? userData.nick_name : "Guest"}
        />
      )}
      <BoardWrite
        isWriteModalOpen={isWriteModalOpen}
        toggleWriteModal={toggleWriteModal}
        onSave={addNewPost}
      />
    </div>
  );
};

export default BoardList;
