import "../../css/BaseballRecord.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MLBRecord({ records, gameId }) {
    const [homeName, setHomeName] = useState("");
    const [awayName, setAwayName] = useState("");

    useEffect(() => {
        const game_url = `/game/games/${gameId}`;
        axios.get(game_url).then((response) => {
            const gameData = response.data.result.game;
            setHomeName(gameData.homeTeamName);
            setAwayName(gameData.awayTeamName);
        });
    }, [gameId]);

    const statLabels = {
        hit: "안타",
        hr: "홈런",
        sb: "도루",
        so: "삼진",
        gd: "병살",
        err: "실책",
    };

    const actions = Object.keys(records.awayKeyStat)
        .filter((stat) => statLabels[stat])
        .map((stat) => ({
            label: statLabels[stat] || stat,
            away: records.awayKeyStat[stat],
            home: records.homeKeyStat[stat],
        }));

    return (
        <div className="record-container">
            {/* 게임 시각화 디테일 */}
            <div className="team-names">
                <div className="away-team-name team-name">{homeName}</div>
                <div className="vs">VS</div>
                <div className="home-team-name team-name">{awayName}</div>
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
                                            action.away >= 15
                                                ? "100%"
                                                : `${(action.away / 15) * 100}%`,
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
                                            action.home >= 15
                                                ? "100%"
                                                : `${(action.home / 15) * 100}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 게임 표 디테일 */}
            <div className="detail-table">
                <div className="batting-records">
                    <h2>타자 기록</h2>
                    <h2>{homeName}</h2>
                    <table className="batting-table">
                        <thead>
                            <tr>
                                <th>{homeName}</th>
                                <th>타수</th>
                                <th>득점</th>
                                <th>안타</th>
                                <th>타점</th>
                                <th>홈런</th>
                                <th>볼넷</th>
                                <th>삼진</th>
                                <th>도루</th>
                                <th>타율</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.homeBatter.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.ab}</td>
                                    <td>{player.run}</td>
                                    <td>{player.hit}</td>
                                    <td>{player.rbi}</td>
                                    <td>{player.hr}</td>
                                    <td>{player.bb}</td>
                                    <td>{player.so}</td>
                                    <td>{player.sb}</td>
                                    <td>{player.hra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>{awayName}</h2>
                    <table className="batting-table">
                        <thead>
                            <tr>
                                <th>{awayName}</th>
                                <th>타수</th>
                                <th>득점</th>
                                <th>안타</th>
                                <th>타점</th>
                                <th>홈런</th>
                                <th>볼넷</th>
                                <th>삼진</th>
                                <th>도루</th>
                                <th>타율</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.awayBatter.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.ab}</td>
                                    <td>{player.run}</td>
                                    <td>{player.hit}</td>
                                    <td>{player.rbi}</td>
                                    <td>{player.hr}</td>
                                    <td>{player.bb}</td>
                                    <td>{player.so}</td>
                                    <td>{player.sb}</td>
                                    <td>{player.hra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pitching Records */}
                <div className="pitching-records">
                    <h2>투수 기록</h2>
                    <h2>{homeName}</h2>
                    <table className="pitching-table">
                        <thead>
                            <tr>
                                <th>{homeName}</th>
                                <th>이닝</th>
                                <th>피안타</th>
                                <th>자책</th>
                                <th>4사구</th>
                                <th>삼진</th>
                                <th>투구수</th>
                                <th>평균자책</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.homePitcher.map((pitcher, index) => (
                                <tr key={index}>
                                    <td>{pitcher.name}</td>
                                    <td>{pitcher.inn}</td>
                                    <td>{pitcher.hit}</td>
                                    <td>{pitcher.er}</td>
                                    <td>{pitcher.bb}</td>
                                    <td>{pitcher.so}</td>
                                    <td>{pitcher.bf}</td>
                                    <td>{pitcher.seasonEra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>{awayName}</h2>
                    <table className="pitching-table">
                        <thead>
                            <tr>
                                <th>{awayName}</th>
                                <th>이닝</th>
                                <th>피안타</th>
                                <th>자책</th>
                                <th>4사구</th>
                                <th>삼진</th>
                                <th>투구수</th>
                                <th>평균자책</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.awayPitcher.map((pitcher, index) => (
                                <tr key={index}>
                                    <td>{pitcher.name}</td>
                                    <td>{pitcher.inn}</td>
                                    <td>{pitcher.hit}</td>
                                    <td>{pitcher.er}</td>
                                    <td>{pitcher.bb}</td>
                                    <td>{pitcher.so}</td>
                                    <td>{pitcher.bf}</td>
                                    <td>{pitcher.seasonEra}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MLBRecord;
