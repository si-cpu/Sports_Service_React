import React, { useState } from "react";
import VolleyballLineup from "../SportsLineup/VolleyballLineup";
import VolleyballRecord from "../SportsRecord/VolleyballRecord";
import "../../css/VolleyballDetail.css";

function VolleyballDetail({ gameData }) {
    const [activeTab, setActiveTab] = useState("record");

    if (!gameData) {
        return <div>Loading game data...</div>;
    }

    let status = gameData.statusInfo;
    if (gameData.statusCode === "RESULT") {
        status = "경기 종료";
    }

    const [date, time] = gameData.gameDateTime.split("T");
    const split_date = `${date.substring(5, 7)}.${date.substring(8, 10)} ${time.substring(0, 5)}`;

    return (
        <div>
            <div className="scoreboard">
                <div className="team-info">
                    <div className="team">
                        <img src="logos/KBO.png" alt="Away Team Logo" className="team-logo" />
                        <div className="team-name">{gameData.awayTeamName}</div>
                    </div>

                    <div className="score">
                        <span className="team-score">{gameData.awayTeamScore}</span>
                        <span className="status">{status}</span>
                        <span className="team-score">{gameData.homeTeamScore}</span>
                    </div>

                    <div className="team">
                        <img
                            src={gameData.homeTeamEmblemUrl}
                            alt="Home Team Logo"
                            className="team-logo"
                        />
                        <div className="team-name">{gameData.homeTeamName}</div>
                    </div>
                </div>

                <div className="match-info">
                    <div className="date-time">{split_date}</div>
                    <div className="stadium">{gameData.stadium}</div>
                </div>
                <div className="quarter-table">
                    <table>
                        <thead>
                            <tr>
                                <th>팀명</th>
                                {gameData.currentScoreBySet.map((set, index) => (
                                    <th key={index}>{set.set}</th>
                                ))}
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{gameData.awayTeamName}</td>
                                {gameData.currentScoreBySet.map((set, index) => (
                                    <td key={index}>{set.awayScore}</td>
                                ))}
                                <td>{gameData.awayTeamScore}</td>
                            </tr>
                            <tr>
                                <td>{gameData.homeTeamName}</td>
                                {gameData.currentScoreBySet.map((set, index) => (
                                    <td key={index}>{set.homeScore}</td>
                                ))}
                                <td>{gameData.homeTeamScore}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tab Section */}
            <div className="tabs">
                <button
                    type="button"
                    className={`tab ${activeTab === "record" ? "active" : ""}`}
                    onClick={() => setActiveTab("record")}
                >
                    기록
                </button>
                <button
                    type="button"
                    className={`tab ${activeTab === "lineup" ? "active" : ""}`}
                    onClick={() => setActiveTab("lineup")}
                >
                    라인업
                </button>
            </div>

            {/* Conditionally Render Tab Content */}
            <div className="tab-content">
                {activeTab === "record" && (
                    <VolleyballRecord
                        gameId={gameData.gameId}
                        homeTeamName={gameData.homeTeamName}
                        awayTeamName={gameData.awayTeamName}
                    />
                )}
                {activeTab === "lineup" && (
                    <VolleyballLineup
                        gameId={gameData.gameId}
                        homeTeamName={gameData.homeTeamName}
                        awayTeamName={gameData.awayTeamName}
                    />
                )}
            </div>
        </div>
    );
}

export default VolleyballDetail;