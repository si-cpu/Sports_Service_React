import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const BoardWriteComponent = ({ isOpen, onClose, addNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    setIsLoading(true);
    try {
      //   실제 서버에 새 게시글 저장 요청
      const response = await axios.post("http://localhost:8181/board/save", {
        title: title,
        content: content,
      });

      // 성공적으로 저장되었을 때 새로운 게시글을 목록에 추가하는 함수 호출
      addNewPost(response);
      alert("게시글 저장 성공!!!");
      onClose();
    } catch (error) {
      console.error("Error creating new post:", error);
      alert("게시글 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="새 글 작성">
      <h2>새 게시글 작성</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <button onClick={handleSave} disabled={isLoading}>
        {isLoading ? "저장 중..." : "저장"}
      </button>
      <button onClick={onClose}>취소</button>
    </Modal>
  );
};

export default BoardWriteComponent;
