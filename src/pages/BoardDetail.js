import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BoardDetail = () => {
  const [boardList, setBoardList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  const getBoardList = async () => {
    try {
      const response = await axios.get(api); // API 요청
      const boardData = response.data; // 응답 데이터 추출
      setBoardList(boardData.data); // 게시글 목록 상태에 저장
      console.log(boardData.pagination); // 페이징 정보 콘솔 출력
    } catch (err) {
      setError("Failed to fetch board list"); // 에러 메시지 저장
      console.error(err); // 콘솔에 에러 출력
    } finally {
      setLoading(false); // 로딩 완료 상태로 변경
    }
  };

  useEffect(() => {
    getBoardList(); // 컴포넌트가 렌더링될 때 게시글 목록 조회
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 컴포넌트
  }

  if (error) {
    return <div>{error}</div>; // 에러가 발생했을 때 표시할 컴포넌트
  }

  return (
    <div>
      <ul>
        {boardList.map((board) => (
          <li key={board.idx}>
            <Link to={`json링크${board.idx}`}>{board.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardDetail;
