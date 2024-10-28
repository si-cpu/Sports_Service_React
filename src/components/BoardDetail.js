import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../css/BoardDetail.css";

const BASE_URL = "http://localhost:3306";

const BoardDetail = ({ isOpen, onClose, board }) => {
    const [title, setTitle] = useState(board.title);
    const [content, setContent] = useState(board.content);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [comments, setComments] = useState([]); // 댓글 조회 MAP 로직
    const [newComment, setNewComment] = useState(""); // 댓글 등록 로직
    const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글 상태 추가
    const [editingContent, setEditingContent] = useState(""); // 수정중인 댓글 내용
    const [currentUser, setCurrentUser] = useState(null); // 현재 사용자 정보

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/board/${board.idx}/comments`);
                setComments(response.data.comments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/currentUser`); // 현재 사용자 정보 요청
                setCurrentUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch current user:", error);
            }
        };

        fetchComments();
        fetchCurrentUser(); // 현재 사용자 정보 가져오기
    }, [board.idx]);

    // 게시글 수정 로직
    const handleEdit = async () => {
        if (!title || !content) {
            alert("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/board/${board.idx}`, {
                title,
                content,
            });

            if (response.data.success) {
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
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${BASE_URL}/board/${board.idx}`);
            if (response.data.success) {
                alert("게시글이 삭제되었습니다.");
                onClose();
            } else {
                alert("게시글 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("게시글 삭제 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 댓글 등록 로직
    const handleAddComment = async () => {
        if (!newComment) {
            alert("댓글 내용을 입력해 주세요.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/board/${board.idx}/comments`, {
                content: newComment,
                writer: currentUser,
            });
            if (response.data.success) {
                setComments([...comments, response.data.comment]);
                setNewComment("");
            } else {
                alert("댓글 추가에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("댓글 추가 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 댓글 삭제 로직
    const handleDeleteComment = async (commentId) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
            if (response.data.success) {
                setComments(comments.filter((comment) => comment.id !== commentId));
            } else {
                alert("댓글 삭제에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("댓글 삭제 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 댓글 수정 로직
    const handleEditComment = async (commentId) => {
        if (!editingContent) {
            alert("댓글 내용을 입력해 주세요.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.put(`${BASE_URL}/comments/${commentId}`, {
                content: editingContent,
            });
            if (response.data.success) {
                setComments(
                    comments.map((comment) =>
                        comment.id === commentId ? { ...comment, content: editingContent } : comment
                    )
                );
                setEditingComment(null);
                setEditingContent("");
            } else {
                alert("댓글 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error editing comment:", error);
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
                        disabled={isLoading} // 로딩 중이면 입력 필드 비활성화
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={isLoading} // 로딩 중이면 입력 필드 비활성화
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
                    {currentUser === board.writer && ( // 작성자만 버튼을 볼 수 있게 조건 추가
                        <>
                            <button onClick={() => setIsEditing(true)} disabled={isLoading}>
                                수정
                            </button>
                            <button onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? "삭제 중..." : "삭제"}
                            </button>
                        </>
                    )}
                </>
            )}
            <button onClick={onClose} disabled={isLoading}>
                닫기
            </button>

            <div className="comments-section">
                <h3>댓글</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {editingComment === comment.id ? (
                            <>
                                <textarea
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => handleEditComment(comment.id)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "저장 중..." : "저장"}
                                </button>
                                <button
                                    onClick={() => setEditingComment(null)}
                                    disabled={isLoading}
                                >
                                    취소
                                </button>
                            </>
                        ) : (
                            <>
                                <p>{comment.content}</p>
                                {currentUser === comment.writer && (
                                    <>
                                        <button
                                            onClick={() => setEditingComment(comment.id)}
                                            disabled={isLoading}
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            disabled={isLoading}
                                        >
                                            삭제
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
                <input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                />
                <button onClick={handleAddComment} disabled={isLoading}>
                    {isLoading ? "저장 중..." : "댓글 추가"}
                </button>
            </div>
        </Modal>
    );
};

export default BoardDetail;
