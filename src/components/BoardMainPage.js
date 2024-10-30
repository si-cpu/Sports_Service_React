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
  const [liked, setLiked] = useState(false); // 좋아요 여부 상태
  const [likes, setLikes] = useState(0); // 좋아요 수 상태
  const [replyLiked, setReplyLiked] = useState({}); // 댓글 좋아요 여부 상태

  const getBoardList = async () => {
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
    // severLikeStatus();
    getBoardList();
  }, []);

  const increaseViewCount = async (board) => {
    const boardNum = board.board_num;
    console.log(boardNum);

    try {
      await axios.put(`${API_URL}/board/view/${boardNum}`);
      const updatedBoardList = boardList.map((item) =>
        item.idx === board.board_num
          ? { ...item, viewCount: item.viewCount + 1 }
          : item
      );
      setBoardList(updatedBoardList);
    } catch (err) {
      console.error("조회수 증가 실패:", err);
    }
  };

  const openModal = (board) => {
    increaseViewCount(board);
    severLikeStatus(board); // 게시글 좋아요 여부 확인
    setSelectedBoard(board);
    setIsModalOpen(true);
  };
  const severLikeStatus = async (board) => {
    try {
      const response = await axios.get(
        `http://localhost:8181/board/like_status/${board.board_num}`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "success") {
        console.log(response.data);

        setLiked(true);
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoard(null);
    getBoardList(); // 서버에서 최신 게시글 목록을 다시 가져와 렌더링
  };

  const toggleWriteModal = () => {
    getBoardList();
    setIsWriteModalOpen(!isWriteModalOpen);
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
      <h1 className="board-list-title">Sports Service 게시글</h1>
      <sec className="button-container">
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
                  <p className="board-list-reg_date">
                    등록일: {board.reg_date}
                  </p>
                  <p className="board-list-mod_date">
                    수정일: {board.mod_date}
                  </p>
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
          writer={isLoggedIn ? userData?.nick_name : "Guest"}
        />
      )}

      {isLoggedIn && (
        <BoardWrite
          isWriteModalOpen={isWriteModalOpen}
          toggleWriteModal={toggleWriteModal}
          onSave={addNewPost}
        />
      )}
    </div>
  );
};
export default BoardList;
