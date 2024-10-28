import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TeamChoose from "../components/TeamChoose";
import "../css/SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();

    // 이메일 값, 이메일 중복 여부, 이메일 형식 오류 여부
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(null);
    const [emailError, setEmailError] = useState("");

    // 비밀번호 값 및 비밀번호 강도
    const [password, setPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");

    // 비밀번호 확인
    const [isPasswordMatch, setIsPasswordMatch] = useState(true);
    const [checkPassword, setCheckPassword] = useState("");

    // 닉네임 값, 닉네임 형식 오류 여부
    const [nickname, setNickname] = useState("");
    const [isNicknameValid, setIsNicknameValid] = useState(null);

    // 팀 선택 값
    const [selectedTeams, setSelectedTeams] = useState({
        KBO: null,
        MLB: null,
        "K-League": null,
        "Premier League": null,
        KBL: null,
        NBA: null,
        "V - League 남자부": null,
        "V - League 여자부": null,
    });

    // 입력값 세팅
    const emailHandeler = (e) => {
        setEmail(e.target.value);
        emailCheckHandeler(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
        checkPasswordStrength(e.target.value);
    };

    const passwordCheckHandler = (e) => {
        setCheckPassword(e.target.value);
        setIsPasswordMatch(e.target.value === password);
    };

    const nicknameHandler = (e) => {
        setNickname(e.target.value);
        setIsNicknameValid(null);
    };

    // 이메일 형식 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailCheckHandeler = (email) => {
        if (!emailRegex.test(email)) {
            setIsEmailValid(false);
            if (email === "") {
                setEmailError("");
            } else {
                setEmailError("유효하지 않은 이메일 형식입니다.");
            }
        } else {
            // 중복검사까지 완료 해야 true로 바꿔줌
            setIsEmailValid(null);
            setEmailError("");
        }
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

    // 이메일 중복 체크
    const checkEmailDuplicate = async () => {
        if (!email || isEmailValid === false) {
            alert("유효한 이메일을 입력하세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8181/member/valid_email", {
                email,
            });

            if (response.data === "notExist") {
                setIsEmailValid(true);
                alert("사용 가능한 이메일입니다.");
            } else if (response.data === "exist") {
                setIsEmailValid(false);
                alert("이미 사용 중인 이메일입니다.");
            }
        } catch (error) {
            console.error("이메일 중복 확인 중 오류 발생:", error);
        }
    };

    // 닉네임 중복 체크
    const checkNicknameDuplicate = async () => {
        if (!nickname || isNicknameValid === false || nickname.length < 2) {
            alert("유효한 닉네임을 입력하세요.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8181/member/valid_id", {
                nick_name: nickname,
            });

            if (response.data === "notExist") {
                setIsNicknameValid(true);
                alert("사용 가능한 닉네임입니다.");
            } else {
                setIsNicknameValid(false);
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error("닉네임 중복 확인 중 오류 발생:", error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // 이메일 상태 확인
        if (!email || isEmailValid !== true) {
            alert("이메일을 확인해주세요.");
            return;
        }

        // 비밀번호 상태 확인
        if (!password || !isPasswordMatch) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 닉네임 상태 확인
        if (!nickname || !isNicknameValid) {
            alert("닉네임을 확인해주세요.");
            return;
        }

        if (Object.values(selectedTeams).every((team) => team === null)) {
            const confirmRes = window.confirm("팀 선택없이 가입하시겠습니까?");
            if (confirmRes) {
                postData();
            }
            return;
        }
        postData();
    };

    const postData = async () => {
        const url = "http://localhost:8181/member/signup";
        const data = {
            email: email,
            password: password,
            nick_name: nickname,
            kbo_team: selectedTeams.KBO,
            mlb_team: selectedTeams.MLB,
            kl_team: selectedTeams["K-League"],
            pl_team: selectedTeams["Premier League"],
            kbl_team: selectedTeams.KBL,
            nba_team: selectedTeams.NBA,
            vman_team: selectedTeams["V - League 남자부"],
            vwo_team: selectedTeams["V - League 여자부"],
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // cors 요청 설정
        };

        try {
            const response = await axios.post(url, data, config);
            if (response.status === 200) {
                alert("회원가입 성공!");
                navigate("/");
            } else {
                alert("회원가입 실패. 정보를 확인하세요.");
            }
        } catch (err) {
            console.error("회원가입 중 오류 발생: ", err);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Sports Service Sign-Up</h1>
                <p>회원가입을 통해 더 다양한 서비스를 만나보세요</p>
                <form onSubmit={submitHandler}>
                    {/* 이메일 입력 */}
                    <div className="input-group">
                        <label>
                            이메일 입력
                            <input
                                type="email"
                                value={email}
                                onChange={emailHandeler}
                                placeholder="이메일 입력"
                                required
                            />
                        </label>

                        <button
                            type="button"
                            className="check-button"
                            onClick={checkEmailDuplicate}
                        >
                            중복확인
                        </button>
                    </div>
                    {emailError && <p className="error">{emailError}</p>}
                    {email && isEmailValid === null && (
                        <p className="success">중복확인을 해주세요.</p>
                    )}
                    {isEmailValid === true && <p className="success">사용 가능한 이메일입니다.</p>}

                    {/* 비밀번호 입력 */}
                    <div className="input-group">
                        <label>
                            비밀번호 입력
                            <input
                                type="password"
                                value={password}
                                onChange={passwordHandler}
                                placeholder="비밀번호 입력 (8~20자)"
                                required
                            />
                        </label>
                    </div>

                    {/* 비밀번호 강도 */}
                    <div className="input-group">
                        <p>{passwordStrength}</p>
                    </div>

                    {/* 비밀번호 확인 */}
                    <div className="input-group">
                        <label>
                            비밀번호 확인
                            <input
                                type="password"
                                value={checkPassword}
                                onChange={passwordCheckHandler}
                                placeholder="비밀번호 확인"
                                required
                            />
                        </label>
                    </div>

                    {/* 비밀번호 일치 */}
                    {checkPassword === "" ? (
                        <p className="error"></p>
                    ) : isPasswordMatch ? (
                        <p className="error">비밀번호가 일치합니다.</p>
                    ) : (
                        <p className="error">비밀번호가 일치하지 않습니다.</p>
                    )}

                    {/* 닉네임 입력 */}
                    <div className="input-group">
                        <label>
                            닉네임 입력
                            <input
                                type="text"
                                value={nickname}
                                onChange={nicknameHandler}
                                placeholder="닉네임 입력 (2글자 이상)"
                                required
                            />
                        </label>

                        {/* 닉네임 중복확인 */}
                        <button
                            type="button"
                            className="check-button"
                            onClick={checkNicknameDuplicate}
                        >
                            중복확인
                        </button>
                    </div>

                    <TeamChoose selectedTeams={selectedTeams} setSelectedTeams={setSelectedTeams} />

                    <button type="submit" className="submit-button">
                        가입하기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
