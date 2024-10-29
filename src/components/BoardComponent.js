import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAuth } from "../auth-context";
import "../css/BoardComponent.css"; // 스타일 불러오기

const BASE_URL = "http://localhost:8181";

const BoardComponent = ({ isOpen, onClose, board }) => {
  const { isLoggedIn, userData } = useAuth();
  const nickname = userData?.nickname;
  const [title, setTitle] = useState(board.title);
  const [board_num, setBoard_num] = useState(board.board_num);
  const [content, setContent] = useState(board.content);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [editingReply, setEditingReply] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [likes, setLikes] = useState(board.likes || 0); // 게시글 좋아요 수 상태
  const [liked, setLiked] = useState(false); // 게시글 좋아요 여부 상태
  const [replyLikes, setReplyLikes] = useState({});
  const [replyLiked, setReplyLiked] = useState({}); // 댓글 좋아요 여부 상태

  useEffect(() => {
    fetchReply();
    checkIfLiked();
  }, [board_num]);

  // 좋아요 여부 초기화 함수
  const checkIfLiked = async () => {
    try {
      // 게시글 좋아요 여부 확인
      const postLikeResponse = await axios.get(
        `${BASE_URL}/board/like_status/${board_num}`,
        { withCredentials: true }
      );
      console.log(postLikeResponse);

      if (postLikeResponse.data === "failed") {
        setLiked(false);
      } else {
        setLiked(true);
      } // 서버로부터 liked 상태를 받아 설정

      const response = await axios.get(
        `http://localhost:8181/reply/like_status/${board_num}`,
        {
          withCredentials: true,
        }
      );

      // 서버에서 좋아요된 reply_num 리스트를 받는다고 가정
      const likedReplies = response.data || []; // 서버에서 { likedReplies: [reply_num, ...] } 형태로 응답

      // 초기 댓글 좋아요 상태 설정
      const initialReplyLiked = {};
      likedReplies.forEach((reply_num) => {
        initialReplyLiked[reply_num] = true; // 리스트에 포함된 reply_num만 true로 설정
      });
      setReplyLiked(initialReplyLiked); // 댓글별 좋아요 여부 설정
    } catch (error) {
      console.error("Error checking if liked:", error);
    }
  };

  // 댓글 목록 불러오기 함수
  const fetchReply = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8181/reply/find_all/${board_num}`
      );
      const replies = response.data || [];
      setReply(replies);

      await checkIfLiked(); // 댓글 좋아요 상태 불러오기
      const initialReplyLikes = {};
      replies.forEach((r) => {
        initialReplyLikes[r.reply_num] = r.likes || 0; // 댓글마다 좋아요 수 초기화
      });
      setReplyLikes(initialReplyLikes);
    } catch (error) {
      console.error("Error fetching reply:", error);
    }
  };

  // 게시글 좋아요/취소 토글 함수
  const toggleLikePost = async () => {
    console.log("liked: ", liked);

    try {
      if (liked) {
        // 좋아요 취소

        await axios.delete(`http://localhost:8181/board/unlike/${board_num}`, {
          withCredentials: true,
        });
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      } else {
        // 좋아요 추가
        await axios.post(`${BASE_URL}/board/like/${board_num}`, null, {
          withCredentials: true,
        });
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  // 댓글 좋아요/취소 토글 함수
  const toggleLikeReply = async (reply_num) => {
    try {
      if (replyLiked[reply_num]) {
        // 좋아요 취소
        await axios.delete(`${BASE_URL}/reply/unlike/${reply_num}`, {
          withCredentials: true,
        });
        setReplyLikes((prevLikes) => ({
          ...prevLikes,
          [reply_num]: Math.max((prevLikes[reply_num] || 1) - 1, 0), // 좋아요 수가 0 이하로 가지 않도록 처리
        }));
        setReplyLiked((prevLiked) => ({
          ...prevLiked,
          [reply_num]: false,
        }));
      } else {
        // 좋아요 추가
        await axios.post(`${BASE_URL}/reply/like/${reply_num}`, null, {
          withCredentials: true,
        });
        setReplyLikes((prevLikes) => ({
          ...prevLikes,
          [reply_num]: (prevLikes[reply_num] || 0) + 1,
        }));
        setReplyLiked((prevLiked) => ({
          ...prevLiked,
          [reply_num]: true,
        }));
      }
    } catch (error) {
      console.error("Error toggling like for reply:", error);
      alert("댓글 좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  // 게시글 수정 로직
  const handleEdit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/board/modify`,
        {
          title: title,
          content: content,
          board_num: board_num,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data === "success") {
        alert("게시글이 수정되었습니다.");
        onClose();
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      alert("게시글 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 삭제 로직
  const handleDeleteContent = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/board/delete/${board_num}`,
        {
          withCredentials: true,
        }
      );

      console.log(board_num);
      if (response.data === "success") {
        alert("게시글이 삭제되었습니다.");
        onClose();
      } else {
        alert("게시글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
      console.log(board_num);
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 추가 로직
  const handleAddReply = async () => {
    if (!newReply) {
      alert("댓글 내용을 입력해 주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/reply/save`,
        {
          content: newReply,
          board_num: board_num,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data === "success") {
        alert("댓글이 등록되었습니다.");
        setNewReply("");
        fetchReply(); // 댓글 목록 다시 불러오기
      } else {
        alert("댓글 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("댓글 추가 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 삭제 로직
  const handleDeleteReply = async (reply_num) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/reply/delete/${reply_num}`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "success") {
        fetchReply(); // 댓글 목록 다시 불러오기
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting reply:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 댓글 수정 로직
  const handleEditReply = async (reply_num) => {
    if (!editingContent) {
      alert("댓글 내용을 입력해 주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(`${BASE_URL}/reply/modify`, {
        reply_num,
        content: editingContent,
        writer: nickname,
      });
      if (response.data === "success") {
        fetchReply(); // 댓글 목록 다시 불러오기
        setEditingReply(null);
        setEditingContent("");
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error editing reply:", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="게시글 내용">
      {isEditing ? (
        <>
          <input
            className="BoardComponent-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <textarea
            className="BoardComponent-contents"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <button
            className="BoardComponent-save-button"
            onClick={handleEdit}
            disabled={isLoading}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
          <button
            className="BoardComponent-cancel-button"
            onClick={() => setIsEditing(false)}
            disabled={isLoading}
          >
            취소
          </button>
        </>
      ) : (
        <>
          <h2 className="BoardComponent-title"> {board.title}</h2>
          <p>작성자: {board.writer}</p>
          <p>{board.content}</p>
          <div>
            <button
              className="BoardComponent-like-button"
              onClick={toggleLikePost}
              disabled={isLoading}
            >
              {liked ? "좋아요 취소" : "좋아요"} 👍 {likes}
            </button>
          </div>
          {userData.nick_name === board.writer && (
            <>
              <button
                className="BoardComponent-modi-button"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                수정
              </button>
              <button
                className="BoardComponent-delet-button"
                onClick={handleDeleteContent}
                disabled={isLoading}
              >
                {isLoading ? "삭제 중..." : "삭제"}
              </button>
            </>
          )}
        </>
      )}
      <button
        className="BoardComponent-close-button"
        onClick={onClose}
        disabled={isLoading}
      >
        닫기
      </button>
      <div className="reply-section">
        <h3 className="BoardComponent-reply-title">댓글</h3>
        {reply.length > 0 ? (
          reply.map((replyItem) => (
            <div key={replyItem.reply_num} className="reply">
              {editingReply === replyItem.reply_num ? (
                <>
                  <textarea
                    className="BoardComponent-reply-content"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    className="BoardComponent-reply-save"
                    onClick={() => handleEditReply(replyItem.reply_num)}
                    disabled={isLoading}
                  >
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                  <button
                    className="BoardComponent-reply-cancel"
                    onClick={() => setEditingReply(null)}
                    disabled={isLoading}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <p className="BoardComponent-content">{replyItem.content}</p>
                  <p className="BoardComponent-writer">
                    작성자: {replyItem.writer}
                  </p>
                  <div>
                    <button
                      onClick={() => toggleLikeReply(replyItem.reply_num)}
                      disabled={isLoading}
                    >
                      {replyLiked[replyItem.reply_num]
                        ? "좋아요 취소"
                        : "좋아요"}{" "}
                      👍 {replyLikes[replyItem.reply_num] || 0}
                    </button>
                  </div>
                  {userData.nick_name === replyItem.writer && (
                    <>
                      <button
                        onClick={() => setEditingReply(replyItem.reply_num)}
                        disabled={isLoading}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteReply(replyItem.reply_num)}
                        disabled={isLoading}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <p>등록된 댓글이 없습니다.</p>
        )}
        {isLoggedIn ? (
          <>
            <input
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              disabled={isLoading}
              placeholder="댓글을 입력하세요..."
            />
            <button onClick={handleAddReply} disabled={isLoading}>
              {isLoading ? "저장 중..." : "댓글 추가"}
            </button>
          </>
        ) : (
          <p>댓글을 작성하려면 로그인이 필요합니다.</p>
        )}
      </div>
    </Modal>
  );
};

export default BoardComponent;
