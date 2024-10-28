import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAuth } from "../auth-context";
import "./BoardComponent.css"; // 스타일 불러오기

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

  useEffect(() => {
    fetchReply();
  }, [board_num]);

  // 댓글 목록 불러오기 함수
  const fetchReply = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/reply/find_all/${board_num}`
      );
      setReply(response.data || []);
    } catch (error) {
      console.error("Error fetching reply:", error);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />
          <button onClick={handleEdit} disabled={isLoading}>
            {isLoading ? "저장 중..." : "저장"}
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isLoading}>
            취소
          </button>
        </>
      ) : (
        <>
          <h2>{board.title}</h2>
          <p>작성자: {board.writer}</p>
          <p>{board.content}</p>
          {userData.nick_name === board.writer && (
            <>
              <button onClick={() => setIsEditing(true)} disabled={isLoading}>
                수정
              </button>
              <button onClick={handleDeleteContent} disabled={isLoading}>
                {isLoading ? "삭제 중..." : "삭제"}
              </button>
            </>
          )}
        </>
      )}
      <button onClick={onClose} disabled={isLoading}>
        닫기
      </button>
      <div className="reply-section">
        <h3>댓글</h3>
        {reply.length > 0 ? (
          reply.map((replyItem) => (
            <div key={replyItem.reply_num} className="reply">
              {editingReply === replyItem.reply_num ? (
                <>
                  <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleEditReply(replyItem.reply_num)}
                    disabled={isLoading}
                  >
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                  <button
                    onClick={() => setEditingReply(null)}
                    disabled={isLoading}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <p>{replyItem.content}</p>
                  <p>작성자: {replyItem.writer}</p>
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
