import React, { useState } from "react";
import axios from "axios";
import TeamChoose from "./TeamChoose";
import "../css/AccountModify.css";
import { useAuth } from "../auth-context";

const AccountModifyEmail = () => {
    const { userData } = useAuth();

    // 이메일 값, 이메일 중복 여부, 이메일 형식 오류 여부
    const [email, setEmail] = useState(userData.email);

    // 현재 비밀번호 값
    const [currentPassword, setCurrentPassword] = useState("");

    // 비밀번호 값 및 비밀번호 강도
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    // 비밀번호 확인
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [checkPassword, setCheckPassword] = useState("");

    // 닉네임 값, 닉네임 형식 오류 여부
    const [nickname, setNickname] = useState(userData.nick_name);

    // 팀 선택 값
    const [selectedTeams, setSelectedTeams] = useState({
        KBO: userData.kbo_team,
        MLB: userData.mlb_team,
        "K-League": userData.kl_team,
        "Premier League": userData.pl_team,
        KBL: userData.kbl_team,
        NBA: userData.nba_team,
        "V - League 남자부": userData.vman_team,
        "V - League 여자부": userData.vwo_team,
    });

    // 입력값 세팅
    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleNickname = (e) => {
        setNickname(e.target.value);
    };

    const handleCurrentPassword = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        checkPasswordStrength(e.target.value);
        setIsPasswordMatch(e.target.value === password);
    };

    const handlePasswordCheck = (e) => {
        setCheckPassword(e.target.value);
        setIsPasswordMatch(e.target.value === password);
    };

    // 이메일 중복 확인 및 유효성 검사
    const checkEmailDuplicate = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert("이메일을 입력해주세요.");
            return false;
        } else if (!emailRegex.test(email)) {
            alert("이메일을 확인해주세요.");
            return false;
        } else if (email !== userData.email) {
            try {
                const response = await axios.get("http://localhost:8181/member/valid_email", {
                    params: { email: email },
                    withCredentials: true,
                });

                if (response.data === "able") {
                    return true;
                } else if (response.data === "existed") {
                    alert("이미 사용 중인 이메일입니다.");
                    return false;
                }
            } catch (error) {
                console.error("이메일 중복 확인 중 오류 발생:", error);
                alert("잠시 후 다시 시도해주세요.");
                return false;
            }
        }
        return true;
    };

    // 닉네임 중복 확인 및 유효성 검사
    const checkNicknameDuplicate = async () => {
        if (!nickname) {
            alert("닉네임을 입력해주세요.");
            return false;
        } else if (nickname !== userData.nick_name) {
            try {
                const response = await axios.get("http://localhost:8181/member/valid_id", {
                    params: { nick_name: nickname },
                    withCredentials: true,
                });

                if (response.data === "able") {
                    return true;
                } else if (response.data === "existed") {
                    alert("이미 사용 중인 닉네임입니다.");
                    return false;
                }
            } catch (error) {
                console.error("닉네임 중복 확인 중 오류 발생:", error);
                alert("잠시 후 다시 시도해주세요.");
                return false;
            }
        }
        return true;
    };

    // 데이터 수정
    const handleModifySubmit = async (e) => {
        e.preventDefault();

        // 수정 전 확인 창
        const confirmRes = window.confirm("수정하시겠습니까??");
        if (confirmRes) {
            // 이메일과 닉네임 유효성 검사를 동시에 실행하고 기다림
            const [isEmailValid, isNicknameValid] = await Promise.all([
                checkEmailDuplicate(),
                checkNicknameDuplicate(),
            ]);

            // 안전 로직 (if)
            if (isEmailValid && isNicknameValid) {
                const url = "http://localhost:8181/member/modify";
                const data = {
                    nickName: nickname === userData.nick_name ? "" : nickname,
                    password: "",
                    email: email === userData.email ? "" : email,
                    kboTeam: selectedTeams.KBO,
                    mlbTeam: selectedTeams.MLB,
                    klTeam: selectedTeams["K-League"],
                    plTeam: selectedTeams["Premier League"],
                    kblTeam: selectedTeams.KBL,
                    nbaTeam: selectedTeams.NBA,
                    vmanTeam: selectedTeams["V - League 남자부"],
                    vwoTeam: selectedTeams["V - League 여자부"],
                };
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                };

                try {
                    const response = await axios.put(url, data, config);
                    if (response.status === 200) {
                        alert("수정이 완료되었습니다. 다시 로그인해주세요.");
                        window.location.reload();
                    } else {
                        alert("수정 정보를 확인하세요.");
                    }
                } catch (err) {
                    console.error("수정 중 오류 발생: ", err);
                    alert("잠시 후 다시 시도해주세요.");
                }
            }
        }
        return;
    };

    // 현재 비밀번호랑 기존 비밀번호랑 맞는지 확인
    const checkMatchCurrentPassword = () => {
        return new Promise(async (resolve) => {
            if (!currentPassword) {
                alert("현재 비밀번호를 입력해주세요.");
                resolve(false);
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
                        resolve(true);
                    } else if (response.data === "failed") {
                        alert("현재 비밀번호가 일치하지 않습니다.");
                        resolve(false);
                    }
                } catch (error) {
                    alert("비밀번호 중복 확인 중 오류 발생: ", error);
                    alert("잠시 후 다시 시도해주세요.");
                    resolve(false);
                }
            }
        });
    };

    // 비밀번호 강도 체크
    const checkPasswordStrength = (password) => {
        let strength = "";

        if (password.length === 0) {
            strength = "";
        } else if (password.length < 8) {
            strength = "비밀번호는 8자 이상이어야 합니다.";
        } else {
            let strengthLevel = 0;
            // 소문자 영어 포함
            if (/[a-z]/.test(password)) strengthLevel++;
            // 대문자 영어 포함
            if (/[A-Z]/.test(password)) strengthLevel++;
            // 숫자 포함
            if (/\d/.test(password)) strengthLevel++;
            // 특수문자 포함
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strengthLevel++;

            switch (strengthLevel) {
                case 2:
                    strength = "보통";
                    break;
                case 3:
                    strength = "강함";
                    break;
                case 4:
                    strength = "매우 강함";
                    break;
                default:
                    strength = "약함";
                    break;
            }
        }
        setPasswordStrength(strength);
    };

    // 비밀번호 수정
    const handlerPasswordSubmit = async (e) => {
        e.preventDefault();

        // 수정 전 확인 창
        const confirmRes = window.confirm("수정하시겠습니까??");
        if (confirmRes) {
            const passwordMatch = await checkMatchCurrentPassword();

            if (!passwordMatch) {
                return;
            }

            // 안전 로직 (if)
            if (!password || !checkPassword) {
                alert("수정할 비밀번호를 입력해주세요.");
                return;
            } else if (password.length < 8) {
                alert("수정할 비밀번호를 8자 이상 입력해주세요.");
                return;
            } else if (!isPasswordMatch) {
                alert("새로운 비밀번호가 일치하지 않습니다.");
                return;
            } else {
                const url = "http://localhost:8181/member/modify";
                const data = {
                    nickName: "",
                    password: password,
                    email: "",
                    kboTeam: selectedTeams.KBO,
                    mlbTeam: selectedTeams.MLB,
                    klTeam: selectedTeams["K-League"],
                    plTeam: selectedTeams["Premier League"],
                    kblTeam: selectedTeams.KBL,
                    nbaTeam: selectedTeams.NBA,
                    vmanTeam: selectedTeams["V - League 남자부"],
                    vwoTeam: selectedTeams["V - League 여자부"],
                };

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                };

                try {
                    const response = await axios.put(url, data, config);
                    if (response.status === 200) {
                        alert("수정이 완료되었습니다. 다시 로그인해주세요.");
                        window.location.reload();
                    } else {
                        alert("비밀번호 정보를 확인하세요.");
                    }
                } catch (err) {
                    console.error("비밀번호 수정 중 오류 발생: ", err);
                    alert("잠시 후 다시 시도해주세요.");
                }
            }
        }
        return;
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();

        // 탈퇴 전 확인 창
        const confirmRes = window.confirm("정말 탈퇴하시겠습니까??");
        if (confirmRes) {
            const passwordMatch = await checkMatchCurrentPassword();

            if (!passwordMatch) {
                return;
            }

            try {
                const response = await axios.delete("http://localhost:8181/member/delete", {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    alert("회원탈퇴가 완료되었습니다.");
                    window.location.reload();
                } else {
                    alert("현재 비밀번호를 확인해 주세요.");
                }
            } catch (err) {
                console.error("회원탈퇴 중 오류 발생: ", err);
                alert("잠시 후 다시 시도해주세요.");
            }
        }
    };

    return (
        <div lassName="modify-page">
            <div className="account-modify-container">
                <h1>회원 정보 변경</h1>
                <form className="account-modify" onSubmit={handleModifySubmit}>
                    <div className="input-group">
                        <label>
                            이메일 수정
                            <input type="email" value={email} onChange={handleEmail} />
                        </label>
                    </div>
                    <div className="input-group">
                        <label>
                            닉네임 수정
                            <input type="text" value={nickname} onChange={handleNickname} />
                        </label>
                    </div>
                    <div className="input-group">
                        <label>마이팀 수정</label>
                        <TeamChoose
                            selectedTeams={selectedTeams}
                            setSelectedTeams={setSelectedTeams}
                        />
                    </div>
                    <button type="submit" className="modify-button">
                        수정하기
                    </button>
                </form>
            </div>

            {/* 비밀번호 변경 */}
            <div className="password-modify-container">
                <h1>비밀번호 변경</h1>
                <form className="password-modify" onSubmit={handlerPasswordSubmit}>
                    <div className="input-group">
                        <label>
                            현재 비밀번호
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={handleCurrentPassword}
                                placeholder="현재 비밀번호"
                            />
                        </label>
                        <label>
                            비밀번호 수정
                            <input
                                type="password"
                                value={password}
                                onChange={handlePassword}
                                placeholder="새 비밀번호 입력 (8~20자)"
                            />
                        </label>
                        <div className="input-group">
                            <p>{passwordStrength}</p>
                        </div>
                        <label>
                            비밀번호 재입력
                            <input
                                type="password"
                                value={checkPassword}
                                onChange={handlePasswordCheck}
                                placeholder="새 비밀번호 확인"
                            />
                        </label>
                    </div>
                    <button type="submit" className="modify-button">
                        수정하기
                    </button>
                </form>

                {/* 회원탈퇴 */}
                <div className="Withdraw-container">
                    <h1>회원탈퇴</h1>
                    <form className="Withdraw" onSubmit={handleWithdraw}>
                        <div className="input-group">
                            <label>
                                현재 비밀번호
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={handleCurrentPassword}
                                    placeholder="현재 비밀번호"
                                />
                            </label>
                        </div>
                        <button type="submit" className="withdraw-button">
                            회원 탈퇴하기
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountModifyEmail;
