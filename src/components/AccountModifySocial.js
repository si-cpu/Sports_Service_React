import React, { useState } from "react";
import axios from "axios";
import TeamChoose from "./TeamChoose";
import "../css/AccountModify.css";
import { useAuth } from "../auth-context";

const AccountModifySocial = () => {
    const { userData } = useAuth();

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

    // 데이터 수정
    const handleModifySubmit = async (e) => {
        e.preventDefault();

        const confirmRes = window.confirm("수정하시겠습니까??");
        if (confirmRes) {
            const url = "http://localhost:8181/member/modify";
            const data = {
                nickName: "",
                password: "",
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
                    alert("수정 정보를 확인하세요.");
                }
            } catch (err) {
                console.error("수정 중 오류 발생: ", err);
            }
        }
        return;
    };

    return (
        <div lassName="modify-page">
            <div className="account-modify-container">
                <h1>마이팀 변경</h1>
                <form className="account-modify" onSubmit={handleModifySubmit}>
                    <div className="input-group">
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
        </div>
    );
};

export default AccountModifySocial;
