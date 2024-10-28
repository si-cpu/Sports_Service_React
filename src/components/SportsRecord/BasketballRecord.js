import React, { useState, useEffect } from "react";
import "../../css/BasketballRecord.css";
import axios from "axios";

function BasketballRecord({ gameId, homeTeamName, awayTeamName }) {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/record`;
        axios.get(url).then((response) => setRecords(response.data.result.recordData));
    }, [gameId]);

    if (!records) {
        return <div>Loading game records...</div>;
    }

    const statLabels = {
        assist: "어시스트",
        aS: "어시스트",
        block: "블록슛",
        bS: "블록슛",
        dRebound: "수비 리바운드",
        dR: "수비 리바운드",
        fg: "야투",
        fgP: "야투 성공률",
        foulTot: "파울",
        ft: "자유투",
        ftP: "자유투 성공률",
        oRebound: "공격 리바운드",
        oR: "공격 리바운드",
        pts: "득점",
        score: "득점",
        steal: "스틸",
        sT: "스틸",
        tReb: "리바운드",
        rebound: "리바운드",
        to: "턴오버",
        threep: "3점슛",
        threepP: "3점슛 성공률",
    };

    const tableStatLabels = {
        playerName: "선수명",
        lastName: "선수명",
        as: "어시스트",
        assists: "어시스트",
        bs: "블록",
        blocks: "블록",
        dr: "수비리바운드",
        dReb: "수비리바운드",
        fg: "야투",
        fgm: "야투",
        fgP: "야투 성공률",
        fgpct: "야투 성공률",
        foulTot: "파울",
        pFouls: "파울",
        ft: "자유투",
        ftm: "자유투",
        ftP: "자유투 성공률",
        ftpct: "자유투 성공률",
        or: "공격 리바운드",
        playTimeStr: "출전시간",
        reboundTot: "리바운드",
        treb: "리바운드",
        scoreTot: "득점",
        pts: "득점",
        st: "스틸",
        steals: "스틸",
        threeP: "3점슛",
        pgm3: "3점슛",
        threePP: "3점슛 성공률",
        ppct3: "3점슛 성공률",
        to: "턴오버",
        turnOver: "턴오버",
        twoP: "2점슛",
        twoPP: "2점슛 성공률",
    };

    const actions = records.away
        ? Object.keys(records.away)
              .filter((stat) => statLabels[stat])
              .map((stat) => ({
                  label: statLabels[stat] || stat,
                  away: records.away[stat],
                  home: records.home[stat],
              }))
        : [];

    const renderTable = (teamName, playerStats) => {
        const availableKeys = Object.keys(tableStatLabels).filter((key) =>
            playerStats.some((player) => player[key] !== undefined && player[key] !== null)
        );

        return (
            <div>
                <h2>{teamName}</h2>
                <table className="soccer-table">
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
                                {action.label === "득점" ? (
                                    <div
                                        className="a-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.away >= 150
                                                    ? "100%"
                                                    : `${(action.away / 150) * 100}%`,
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="a-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.away >= 80
                                                    ? "100%"
                                                    : `${(action.away / 80) * 100}%`,
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
                                {action.label === "득점" ? (
                                    <div
                                        className="h-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.home >= 150
                                                    ? "100%"
                                                    : `${(action.home / 150) * 100}%`,
                                        }}
                                    ></div>
                                ) : (
                                    <div
                                        className="h-filled-bar filled-bar"
                                        style={{
                                            width:
                                                action.home >= 80
                                                    ? "100%"
                                                    : `${(action.home / 80) * 100}%`,
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
                <div className="basketball-records">
                    {renderTable(homeTeamName, records.homePlayerStats)}
                    {renderTable(awayTeamName, records.awayPlayerStats)}
                </div>
            </div>
        </div>
    );
}

export default BasketballRecord;
