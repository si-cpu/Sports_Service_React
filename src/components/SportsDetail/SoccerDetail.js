import React, { useState } from "react";
import SoccerLineup from "../SportsLineup/SoccerLineup";
import SoccerRecord from "../SportsRecord/SoccerRecord";
import "../../css/SoccerDetail.css";

function SoccerDetail({ gameData }) {
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

                <div className="goal-table">
                    <div className="team-goals away-team-goal">
                        {gameData.scorers.away.map((goal, index) => (
                            <div key={index} className="goal-scorer">
                                {goal.playerName} {goal.time}’ <span className="goal-icon">⚽</span>
                            </div>
                        ))}
                    </div>

                    <div className="goal-separator"></div>

                    <div className="team-goals home-team-goal">
                        {gameData.scorers.home.map((goal, index) => (
                            <div key={index} className="goal-scorer">
                                <span className="goal-icon">⚽</span>
                                {goal.playerName} {goal.time}’
                            </div>
                        ))}
                    </div>
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
                    <SoccerRecord
                        gameId={gameData.gameId}
                        gameLeague={gameData.categoryId}
                        homeTeamName={gameData.homeTeamName}
                        awayTeamName={gameData.awayTeamName}
                    />
                )}
                {activeTab === "lineup" && (
                    <SoccerLineup
                        gameId={gameData.gameId}
                        gameLeague={gameData.categoryId}
                        homeTeamName={gameData.homeTeamName}
                        awayTeamName={gameData.awayTeamName}
                    />
                )}
            </div>
        </div>
    );
}

export default SoccerDetail;
