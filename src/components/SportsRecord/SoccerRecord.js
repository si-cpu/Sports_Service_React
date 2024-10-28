import React, { useState, useEffect } from "react";
import "../../css/SoccerRecord.css";
import axios from "axios";

function SoccerRecord({ gameId, gameLeague, homeTeamName, awayTeamName }) {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/record`;
        axios.get(url).then((response) => setRecords(response.data.result.recordData));
    }, [gameId]);

    if (!records) {
        return <div>Loading game records...</div>;
    }

    const statLabels = {
        ballPossession: "볼점유율",
        cornerKick: "코너킥",
        dismissal: "퇴장",
        foul: "파울",
        goalKick: "골킥",
        offside: "오프사이드",
        shooting: "슈팅",
        shotsOnGoal: "유효슈팅",
        substitution: "선수교체",
        yellow: "경고",
        booking: "경고",
        corner: "코너킥",
        freeKick: "프리킥",
        goalKeeperSaves: "선방",
        shot: "슈팅",
        shotsOffGoal: "",
        substitute: "선수교체",
    };

    const tableStatLabels = {
        playerName: "이름",
        workQty: "출전",
        goals: "득점",
        assists: "도움",
        shots: "슈팅",
        shotsOnGoal: "유효슈팅",
        playerPoint: "평균평점",
        foulsCommitted: "파울",
        booking: "경고",
        dismissal: "퇴장",
        workTime: "출전시간",
        passes: "패스",
        interceptions: "인터셉트",
        blocks: "패스차단",
        tackles: "태클",
        clears: "걷어내기",
    };

    const klActions = records.away
        ? Object.keys(records.away)
              .filter((stat) => statLabels[stat])
              .map((stat) => ({
                  label: statLabels[stat] || stat,
                  away: records.away[stat],
                  home: records.home[stat],
              }))
        : [];

    const plActions = records.awayRecord
        ? Object.keys(records.awayRecord)
              .filter((stat) => statLabels[stat])
              .map((stat) => ({
                  label: statLabels[stat] || stat,
                  away: records.awayRecord[stat],
                  home: records.homeRecord[stat],
              }))
        : [];

    const actions = gameLeague === "kleague" ? klActions : plActions;

    const renderTable = (teamName, playerStats) => {
        // Determine which stats are available for any player
        const availableKeys = Object.keys(tableStatLabels).filter((key) =>
            playerStats.some((player) => player[key] !== undefined && player[key] !== null)
        );

        return (
            <div>
                <h2>{teamName}</h2>
                <table className="soccer-table">
                    <thead>
                        <tr>
                            {/* Only render columns for available stats */}
                            {availableKeys.map((key) => (
                                <th key={key}>{tableStatLabels[key]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {playerStats.map((player, index) => (
                            <tr key={index}>
                                {/* Render values for the available stats */}
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
                                {action.label === "볼점유율" ? (
                                    <div
                                        className="a-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.away >= 100
                                                    ? "100%"
                                                    : `${(action.away / 100) * 100}%`,
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="a-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.away >= 20
                                                    ? "100%"
                                                    : `${(action.away / 20) * 100}%`,
                                        }}
                                    ></div>
                                )}
                            </div>
                            <div className="stat-value">{action.away}</div>
                        </div>

                        {/* Action label */}
                        <div className="action-label">{action.label}</div>

                        {/* Home team action */}
                        <div className="home-team-stat team-stat">
                            <div className="stat-value">{action.home}</div>
                            <div className="bar">
                                {action.label === "볼점유율" ? (
                                    <div
                                        className="h-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.home >= 100
                                                    ? "100%"
                                                    : `${(action.home / 100) * 100}%`,
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="h-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.home >= 20
                                                    ? "100%"
                                                    : `${(action.home / 20) * 100}%`,
                                        }}
                                    ></div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* 게임 표 디테일 */}
            <div className="detail-table">
                <div className="soccer-records">
                    {renderTable(homeTeamName, records.homePlayerStats)}
                    {renderTable(awayTeamName, records.awayPlayerStats)}
                </div>
            </div>
        </div>
    );
}

export default SoccerRecord;
