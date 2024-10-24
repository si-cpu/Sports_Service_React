import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BoardWriteComponent from "../components/BoardWriteComponent";
import BoardComponent from "../components/BoardComponent";

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태 추가
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [currentUser] = useState(""); // 현재 사용자의 닉네임을 저장하는 상태

  // 게시글 불러오기 로직
  const getBoardList = async () => {
    try {
      const response = await axios.get("http://localhost:3306/board");
      const boardData = response.data;
      setBoardList(boardData.data);
      console.log(boardData.pagination);
    } catch (err) {
      setError("게시글 불러오는데 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoardList();
  }, []);

  // 조회 수  증가 로직 서버 연동
  const increaseViewCount = async (board) => {
    try {
      await axios.post(
        `http://localhost:3306/board/${board.idx}/increaseViewCount`
      );
      const updatedBoardList = boardList.map((item) =>
        item.idx === board.idx
          ? { ...item, viewCount: item.viewCount + 1 }
          : item
      );
      setBoardList(updatedBoardList);
    } catch (err) {
      console.error("조회수 증가 실패:", err);
    }
  };

  // 좋아요 수 증가 로직 서버 연동
  const increaseLikeCount = async (board) => {
    try {
      await axios.post(`http://localhost:3306/board/${board.idx}/like`);
      const updatedBoardList = boardList.map((item) =>
        item.idx === board.idx
          ? { ...item, likeCount: item.likeCount + 1 }
          : item
      );
      setBoardList(updatedBoardList);
    } catch (err) {
      console.error("좋아요 증가 실패:", err);
    }
  };

  //함수선언
  const openModal = (board) => {
    increaseViewCount(board);
    setSelectedBoard(board);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoard(null);
  };

  const openWriteModal = () => {
    setIsWriteModalOpen(true);
  };

  const closeWriteModal = () => {
    setIsWriteModalOpen(false);
  };

  const addNewPost = (newPost) => {
    setBoardList([newPost, ...boardList]); // 새 게시글을 리스트 앞에 추가
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="title">Sports Service 게시글</h1>
      <button type="button" onClick={openWriteModal}>
        글쓰기
      </button>
      <ul>
        {boardList.map((board, board_num) => (
          <li key={board.idx}>
            <Link to="#" onClick={() => openModal(board)}>
              <div>
                <section className="idx">글번호: {board_num + 1}</section>
                <strong>{board.title}</strong> - {board.writer}{" "}
                <p>{board.content}</p>
                <p>{board.reg_time}</p>
                <p>{board.viewCount}</p>
                <p>좋아요 수: {board.likeCount}</p> {/* 좋아요 수 표시 */}
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
          currentUser={currentUser} // 현재 사용자 정보 전달
        />
      )}
      <BoardWriteComponent
        isOpen={isWriteModalOpen}
        onClose={closeWriteModal}
        addNewPost={addNewPost} // 새로운 게시글 추가 함수 전달
      />
    </div>
  );
};

export default BoardList;
