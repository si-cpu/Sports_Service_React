import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BoardWriteComponent from "../components/BoardWriteComponent";
import BoardComponent from "../components/BoardComponent";

const BoardListBlock = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #343a40;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.25rem;
  background: #3b5998;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  &:hover {
    background: #3a5888;
  }
`;

const BoardListUl = styled.ul`
  list-style: none;
  padding: 0;
`;

const BoardListLi = styled.li`
  background: #ffffff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  &:hover {
    background: #e9ecef;
  }
  a {
    text-decoration: none;
    color: inherit;
    display: block;
  }
`;

const BoardItem = styled.div`
  h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #495057;
  }
  p {
    margin: 0.5rem 0;
    color: #868e96;
  }
`;

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태 추가
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [currentUser] = useState(""); // 현재 사용자의 닉네임을 저장하는 상태
  const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

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

  // 조회수 증가 로직 서버 연동
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBoardList = boardList.filter((board) =>
    board.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BoardListBlock>
      <Title>Sports Service 게시글</Title>
      <Button onClick={openWriteModal}>글쓰기</Button>
      <SearchInput
        type="text"
        placeholder="검색어 입력"
        value={searchQuery}
        onChange={handleSearch}
      />
      <BoardListUl>
        {filteredBoardList.map((board, board_num) => (
          <BoardListLi key={board.idx}>
            <Link to="#" onClick={() => openModal(board)}>
              <BoardItem>
                <section className="idx">글번호: {board_num + 1}</section>
                <h2>{board.title}</h2>
                <p>작성자: {board.writer}</p>
                <p>내용: {board.content}</p>
                <p>등록일: {board.reg_time}</p>
                <p>조회수: {board.viewCount}</p>
                <p>좋아요 수: {board.likeCount}</p>
              </BoardItem>
            </Link>
          </BoardListLi>
        ))}
      </BoardListUl>
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
    </BoardListBlock>
  );
};

export default BoardList;
