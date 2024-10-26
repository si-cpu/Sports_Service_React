import React, { useState, useEffect, useMemo, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BoardWriteComponent from "../components/BoardWriteComponent";
import BoardComponent from "../components/BoardComponent";
import AuthContext from "../auth-context";

const API_URL = "http://localhost:8181/board";

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
  width: calc(100% - 100px);
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  padding: 0.5rem;
  margin-left: 10px;
  background: #3b5998;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #3a5888;
  }
`;

const SortButton = styled.button`
  margin-left: 10px;
  padding: 0.5rem;
  background: #3b5998;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #3a5888;
  }
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
  const { currentUser } = useContext(AuthContext);
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");

  const getBoardList = async () => {
    try {
      const response = await axios.get(`${API_URL}/find_all`);
      setBoardList(response.data);
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

  const increaseViewCount = async (board) => {
    try {
      await axios.post(`${API_URL}/findall/${board.idx}/increaseViewCount`);
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

  if (error) {
    return (
      <div>
        {error}
        <button onClick={getBoardList}>Retry</button>
      </div>
    );
  }

  return (
    <BoardListBlock>
      <Title>Sports Service 게시글</Title>
      {currentUser && <Button onClick={openWriteModal}>글쓰기</Button>} {/* 로그인 상태일 때만 보이도록 수정 */}
      <div>
        <SearchInput
          type="text"
          placeholder="검색어 입력"
          value={searchQuery}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search posts"
        />
        <SearchButton onClick={() => setSearchQuery(searchQuery)}>
          검색
        </SearchButton>
        <SortButton onClick={() => setSortBy("views")}>조회수 정렬</SortButton>
        <SortButton onClick={() => setSortBy("likes")}>추천수 정렬</SortButton>
      </div>
      <BoardListUl>
        {filteredAndSortedBoardList.map((board) => (
          <BoardListLi key={board.idx}>
            <Link to="#" onClick={() => openModal(board)}>
              <BoardItem>
                <section className="idx">글번호: {board.idx}</section>
                <h2>{board.title}</h2>
                <p>작성자: {board.writer}</p>
                <p>내용: {board.content}</p>
                <p>등록일: {board.reg_date}</p>
                <p>수정일: {board.mod_date}</p>
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
          currentUser={currentUser}
        />
      )}
      <BoardWriteComponent
        isOpen={isWriteModalOpen}
        onClose={closeWriteModal}
        addNewPost={addNewPost}
      />
    </BoardListBlock>
  );
};

export default BoardList;
