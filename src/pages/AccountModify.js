import React, { useState } from "react";
import AccountModifySocial from "../components/AccountModifySocial";
import AccountModifyEmail from "../components/AccountModifyEmail";
import "../css/AccountModify.css";
import { useAuth } from "../auth-context";
import axios from "axios";

const AccountModify = () => {
    const { userData } = useAuth();

    // 현재 비밀번호 값
    const [currentPassword, setCurrentPassword] = useState("");
    const [isCurrentPasswordMatch, setIsCurrentPasswordMatch] = useState(false);

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    // 현재 비밀번호랑 기존 비밀번호랑 맞는지 확인
    const checkMatchCurrentPassword = () => {
        return new Promise(async (resolve) => {
            if (!currentPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                setIsCurrentPasswordMatch(false);
            } else {
                try {
                    const response = await axios.get(
                        "http://localhost:8181/member/valid_password",
                        {
                            params: { password: currentPassword },
                            withCredentials: true,
                        }
                    );
                    if (response.data === "success") {
                        setIsCurrentPasswordMatch(true);
                    } else if (response.data === "failed") {
                        alert("현재 비밀번호가 일치하지 않습니다.");
                        setIsCurrentPasswordMatch(false);
                    }
                } catch (error) {
                    alert("비밀번호 확인 중 오류 발생: ", error);
                    alert("잠시 후 다시 시도해주세요.");
                    setIsCurrentPasswordMatch(false);
                }
            }
        });
    };

    return (
        <div lassName="modify-page">
            {isCurrentPasswordMatch ? (
                <AccountModifyEmail />
            ) : (
                <div>
                    <h2>비밀번호 확인</h2>
                    <input
                        type="password"
                        placeholder="현재 비밀번호"
                        value={currentPassword}
                        onChange={handleCurrentPassword}
                    />
                    <button onClick={checkMatchCurrentPassword}>확인</button>
                </div>
            )}
        </div>
    );
};

export default AccountModify;
