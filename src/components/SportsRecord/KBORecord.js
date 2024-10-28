import "../../css/BaseballRecord.css";
import React from "react";

function KBORecord({ records }) {
    const statLabels = {
        hit: "안타",
        hr: "홈런",
        sb: "도루",
        kk: "삼진",
        gd: "병살",
        err: "실책",
    };

    const actions = Object.keys(records.todayKeyStats.away)
        .filter((stat) => statLabels[stat])
        .map((stat) => ({
            label: statLabels[stat] || stat,
            away: records.todayKeyStats.away[stat],
            home: records.todayKeyStats.home[stat],
        }));

    const groupedRecords = records.etcRecords.reduce((acc, record) => {
        if (!acc[record.how]) {
            acc[record.how] = [];
        }
        acc[record.how].push(record.result);
        return acc;
    }, {});

    return (
        <div className="record-container">
            {/* 게임 시각화 디테일 */}
            <div className="team-names">
                <div className="away-team-name team-name">{records.gameInfo.aFullName}</div>
                <div className="vs">VS</div>
                <div className="home-team-name team-name">{records.gameInfo.hFullName}</div>
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

            {/* 게임 텍스트 디테일 */}
            <div className="game-summary">
                <h2>경기 상세 기록</h2>
                <div className="etc-records">
                    {Object.entries(groupedRecords).map(([how, results]) => (
                        <div key={how} className="record-section">
                            <div className="how-label">{how}</div>
                            <ul className="result-list">
                                {results.map((result, index) => (
                                    <li key={index}>{result}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* 게임 표 디테일 */}
            <div className="detail-table">
                <div className="batting-records">
                    <h2>타자 기록</h2>
                    <h2>{records.gameInfo.hName}</h2>
                    <table className="batting-table">
                        <thead>
                            <tr>
                                <th>{records.gameInfo.hName}</th>
                                <th>타수</th>
                                <th>득점</th>
                                <th>안타</th>
                                <th>타점</th>
                                <th>홈런</th>
                                <th>볼넷</th>
                                <th>삼진</th>
                                <th>도루</th>
                                <th>타율</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.battersBoxscore.home.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.ab}</td>
                                    <td>{player.run}</td>
                                    <td>{player.hit}</td>
                                    <td>{player.rbi}</td>
                                    <td>{player.hr}</td>
                                    <td>{player.bb}</td>
                                    <td>{player.kk}</td>
                                    <td>{player.sb}</td>
                                    <td>{player.hra}</td>
                                    <td>{player.inn1}</td>
                                    <td>{player.inn2}</td>
                                    <td>{player.inn3}</td>
                                    <td>{player.inn4}</td>
                                    <td>{player.inn5}</td>
                                    <td>{player.inn6}</td>
                                    <td>{player.inn7}</td>
                                    <td>{player.inn8}</td>
                                    <td>{player.inn9}</td>
                                    <td>{player.inn10}</td>
                                    <td>{player.inn11}</td>
                                    <td>{player.inn12}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h2>{records.gameInfo.aName}</h2>
                    <table className="batting-table">
                        <thead>
                            <tr>
                                <th>{records.gameInfo.aName}</th>
                                <th>타수</th>
                                <th>득점</th>
                                <th>안타</th>
                                <th>타점</th>
                                <th>홈런</th>
                                <th>볼넷</th>
                                <th>삼진</th>
                                <th>도루</th>
                                <th>타율</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                                <th>10</th>
                                <th>11</th>
                                <th>12</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.battersBoxscore.away.map((player, index) => (
                                <tr key={index}>
                                    <td>{player.name}</td>
                                    <td>{player.ab}</td>
                                    <td>{player.run}</td>
                                    <td>{player.hit}</td>
                                    <td>{player.rbi}</td>
                                    <td>{player.hr}</td>
                                    <td>{player.bb}</td>
                                    <td>{player.kk}</td>
                                    <td>{player.sb}</td>
                                    <td>{player.hra}</td>
                                    <td>{player.inn1}</td>
                                    <td>{player.inn2}</td>
                                    <td>{player.inn3}</td>
                                    <td>{player.inn4}</td>
                                    <td>{player.inn5}</td>
                                    <td>{player.inn6}</td>
                                    <td>{player.inn7}</td>
                                    <td>{player.inn8}</td>
                                    <td>{player.inn9}</td>
                                    <td>{player.inn10}</td>
                                    <td>{player.inn11}</td>
                                    <td>{player.inn12}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pitching Records */}
                <div className="pitching-records">
                    <h2>투수 기록</h2>
                    <h2>{records.gameInfo.hName}</h2>
                    <table className="pitching-table">
                        <thead>
                            <tr>
                                <th>{records.gameInfo.hName}</th>
                                <th>이닝</th>
                                <th>피안타</th>
                                <th>실점</th>
                                <th>자책</th>
                                <th>4사구</th>
                                <th>삼진</th>
                                <th>피홈런</th>
                                <th>타자</th>
                                <th>타수</th>
                                <th>투구수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.pitchersBoxscore.home.map((pitcher, index) => (
                                <tr key={index}>
                                    <td>{pitcher.name}</td>
                                    <td>{pitcher.inn}</td>
                                    <td>{pitcher.hit}</td>
                                    <td>{pitcher.r}</td>
                                    <td>{pitcher.er}</td>
                                    <td>{pitcher.bbhp}</td>
                                    <td>{pitcher.kk}</td>
                                    <td>{pitcher.hr}</td>
                                    <td>{pitcher.pa}</td>
                                    <td>{pitcher.ab}</td>
                                    <td>{pitcher.bf}</td>
                                </tr>
                            ))}
                            <tr key="pitching-total">
                                <td>합계</td>
                                <td>{records.teamPitchingBoxscore.home.inn}</td>
                                <td>{records.teamPitchingBoxscore.home.hit}</td>
                                <td>{records.teamPitchingBoxscore.home.r}</td>
                                <td>{records.teamPitchingBoxscore.home.er}</td>
                                <td>{records.teamPitchingBoxscore.home.bbhp}</td>
                                <td>{records.teamPitchingBoxscore.home.kk}</td>
                                <td>{records.teamPitchingBoxscore.home.hr}</td>
                                <td>{records.teamPitchingBoxscore.home.pa}</td>
                                <td>{records.teamPitchingBoxscore.home.ab}</td>
                                <td>{records.teamPitchingBoxscore.home.bf}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>{records.gameInfo.aName}</h2>
                    <table className="pitching-table">
                        <thead>
                            <tr>
                                <th>{records.gameInfo.aName}</th>
                                <th>이닝</th>
                                <th>피안타</th>
                                <th>실점</th>
                                <th>자책</th>
                                <th>4사구</th>
                                <th>삼진</th>
                                <th>피홈런</th>
                                <th>타자</th>
                                <th>타수</th>
                                <th>투구수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.pitchersBoxscore.away.map((pitcher, index) => (
                                <tr key={index}>
                                    <td>{pitcher.name}</td>
                                    <td>{pitcher.inn}</td>
                                    <td>{pitcher.hit}</td>
                                    <td>{pitcher.r}</td>
                                    <td>{pitcher.er}</td>
                                    <td>{pitcher.bbhp}</td>
                                    <td>{pitcher.kk}</td>
                                    <td>{pitcher.hr}</td>
                                    <td>{pitcher.pa}</td>
                                    <td>{pitcher.ab}</td>
                                    <td>{pitcher.bf}</td>
                                </tr>
                            ))}
                            <tr key="pitching-total">
                                <td>합계</td>
                                <td>{records.teamPitchingBoxscore.away.inn}</td>
                                <td>{records.teamPitchingBoxscore.away.hit}</td>
                                <td>{records.teamPitchingBoxscore.away.r}</td>
                                <td>{records.teamPitchingBoxscore.away.er}</td>
                                <td>{records.teamPitchingBoxscore.away.bbhp}</td>
                                <td>{records.teamPitchingBoxscore.away.kk}</td>
                                <td>{records.teamPitchingBoxscore.away.hr}</td>
                                <td>{records.teamPitchingBoxscore.away.pa}</td>
                                <td>{records.teamPitchingBoxscore.away.ab}</td>
                                <td>{records.teamPitchingBoxscore.away.bf}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default KBORecord;
