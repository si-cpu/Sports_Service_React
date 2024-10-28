import React, { useState, useEffect } from "react";
import "../../css/VolleyballRecord.css";
import axios from "axios";

function VolleyballRecord({ gameId, homeTeamName, awayTeamName }) {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/record`;
        axios.get(url).then((response) => setRecords(response.data.result.recordData));
    }, [gameId]);

    if (!records) {
        return <div>Loading game records...</div>;
    }

    const statLabels = {
        attackSuccessRate: "공격 성공률",
        attackSuccessCount: "공격 득점",
        blockSuccessCount: "블로킹 득점",
        serveSuccessCount: "서브 득점",
        opponentErrorCount: "상대 범실",
        digSuccessCount: "디그 성공",
        exactReceiveCount: "리시브 정확",
        exactTossCount: "세트 성공",
    };

    const tableStatLabels = {
        playerName: "선수명",
        point: "득점",
        attackSuccessRate: "공격성공률",
        servePerSet: "서브",
        digPerSet: "디그",
        tossPerSet: "세트",
        receiveSuccessRate: "리시브효율",
        blockingPerSet: "블로킹",
        error: "범실",
    };

    const actions = records.gameRecord.away
        ? Object.keys(records.gameRecord.away)
              .filter((stat) => statLabels[stat])
              .map((stat) => ({
                  label: statLabels[stat] || stat,
                  away: records.gameRecord.away[stat],
                  home: records.gameRecord.home[stat],
              }))
        : [];

    const renderTable = (teamName, playerStats) => {
        const availableKeys = Object.keys(tableStatLabels).filter((key) =>
            playerStats.some((player) => player[key] !== undefined && player[key] !== null)
        );

        return (
            <div>
                <h2>{teamName}</h2>
                <table className="volleyball-table">
                    <thead>
                        <tr>
                            {availableKeys.map((key) => (
                                <th key={key}>{tableStatLabels[key]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {playerStats.map((player, index) => (
                            <tr key={index}>
                                {availableKeys.map((key) => (
                                    <td key={key}>{player[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="record-container">
            {/* 게임 시각화 디테일 */}
            <div className="team-names">
                <div className="away-team-name team-name">{awayTeamName}</div>
                <div className="vs">VS</div>
                <div className="home-team-name team-name">{homeTeamName}</div>
            </div>
            <div className="record-table">
                {actions.map((action, index) => (
                    <div key={index} className="record-row">
                        {/* Away team action */}
                        <div className="away-team-stat team-stat">
                            <div className="bar">
                                <div
                                    className="a-filled-bar filled-bar"
                                    style={{
                                        width:
                                            action.away >= 100
                                                ? "100%"
                                                : `${(action.away / 100) * 100}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="stat-value">{action.away}</div>
                        </div>

                        {/* Action label */}
                        <div className="action-label">{action.label}</div>

                        {/* Home team action */}
                        <div className="home-team-stat team-stat">
                            <div className="stat-value">{action.home}</div>
                            <div className="bar">
                                <div
                                    className="h-filled-bar filled-bar"
                                    style={{
                                        width:
                                            action.home >= 100
                                                ? "100%"
                                                : `${(action.home / 100) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* 게임 표 디테일 */}
            <div className="detail-table">
                <div className="volleyball-records">
                    {renderTable(homeTeamName, records.playerStatOfGame.home)}
                    {renderTable(awayTeamName, records.playerStatOfGame.away)}
                </div>
            </div>
        </div>
    );
}

export default VolleyballRecord;
