import React, { useState, useEffect } from "react";
import BaseballLineup from "../SportsLineup/BaseballLineup";
import BaseballRecord from "../SportsRecord/BaseballRecord";
import "../../css/BaseballDetail.css";

function BaseballDetail({ gameData }) {
    const [homePitcher, setHomePitcher] = useState("");
    const [awayPitcher, setAwayPitcher] = useState("");
    const [activeTab, setActiveTab] = useState("record");

    useEffect(() => {
        if (gameData && gameData.statusCode === "RESULT") {
            // Show winning and losing pitchers
            if (gameData.homeTeamScore > gameData.awayTeamScore) {
                setHomePitcher(`승-${gameData.winPitcherName}`);
                setAwayPitcher(`패-${gameData.losePitcherName}`);
            } else {
                setHomePitcher(`패-${gameData.losePitcherName}`);
                setAwayPitcher(`승-${gameData.winPitcherName}`);
            }
        } else if (gameData && gameData.statusCode === "STARTED") {
            // Show current pitcher
            setHomePitcher(`투수-${gameData.homeCurrentPitcherName}`);
            setAwayPitcher(`투수-${gameData.awayCurrentPitcherName}`);
        } else if (gameData && gameData.statusCode === "BEFORE") {
            // Show starting pitcher
            setHomePitcher(`선발-${gameData.homeStarterName}`);
            setAwayPitcher(`선발-${gameData.awayStarterName}`);
        }
    }, [gameData]);

    if (!gameData) {
        return <div>Loading game data...</div>;
    }

    const [date, time] = gameData.gameDateTime.split("T");
    const split_date = `${date.substring(5, 7)}.${date.substring(8, 10)} ${time.substring(0, 5)}`;

    let status = gameData.statusInfo;
    if (gameData.statusCode === "RESULT") {
        status = "경기 종료";
    }

    return (
        <div>
            <div className="scoreboard">
                <div className="team-info">
                    <div className="team">
                        <img
                            src={gameData.awayTeamEmblemUrl}
                            alt="Away Team Logo"
                            className="team-logo"
                        />
                        <div className="team-name">{gameData.awayTeamName}</div>
                        <div className="team-pitcher">{awayPitcher}</div>
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
                        <div className="team-pitcher">{homePitcher}</div>
                    </div>
                </div>

                <div className="match-info">
                    <div className="date-time">{split_date}</div>
                    <div className="stadium">{gameData.stadium}</div>
                </div>

                <div className="inning-table">
                    <table>
                        <thead>
                            <tr>
                                <td>팀명</td>
                                {gameData.awayTeamScoreByInning.map((score, index) => (
                                    <td key={index}>{index + 1}</td>
                                ))}
                                <td>R</td>
                                <td>H</td>
                                <td>E</td>
                                <td>B</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{gameData.awayTeamName}</td>
                                {gameData.awayTeamScoreByInning.map((score, index) => (
                                    <td key={index}>{score}</td>
                                ))}
                                {gameData.awayTeamRheb.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                            <tr>
                                <td>{gameData.homeTeamName}</td>
                                {gameData.homeTeamScoreByInning.map((score, index) => (
                                    <td key={index}>{score}</td>
                                ))}
                                {gameData.homeTeamRheb.map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
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
                {activeTab === "record" &&
                    (gameData.statusInfo === "경기전" || gameData.statusInfo === "경기취소" ? (
                        <div>경기 데이터 없음</div>
                    ) : (
                        <BaseballRecord gameId={gameData.gameId} gameLeague={gameData.categoryId} />
                    ))}

                {activeTab === "lineup" &&
                    (gameData.statusInfo === "경기전" || gameData.statusInfo === "경기취소" ? (
                        <div>경기 데이터 없음</div>
                    ) : (
                        <BaseballLineup gameId={gameData.gameId} gameLeague={gameData.categoryId} />
                    ))}
            </div>
        </div>
    );
}

export default BaseballDetail;
