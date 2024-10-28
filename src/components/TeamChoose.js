import React, { useState } from "react";
import { sportsData } from "../datas/sportsData";

function Tttt({ selectedTeams, setSelectedTeams }) {
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedLeague, setSelectedLeague] = useState(null);

    // 스포츠 선택
    const handleSportSelect = (sport) => {
        setSelectedSport(sport);
        setSelectedLeague(null);
    };

    // 리그 선택
    const handleLeagueSelect = (league) => {
        setSelectedLeague(league);
    };

    // 팀 선택
    const handleTeamSelect = (league, team) => {
        setSelectedTeams((prev) => ({
            ...prev,
            [league]: team,
        }));
    };

    // 선택 해제
    const handleRemoveTeam = (league) => {
        setSelectedTeams((prev) => ({
            ...prev,
            [league]: null,
        }));
    };

    return (
        <div>
            {/* 스포츠 선택 */}
            <div style={{ marginBottom: "30px" }}>
                <h2>마이팀을 선택하세요</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {Object.keys(sportsData).map((sport) => (
                        <button
                            key={sport}
                            type="button"
                            onClick={() => handleSportSelect(sport)}
                            style={{
                                margin: "5px",
                                padding: "10px",
                                backgroundColor: selectedSport === sport ? "#f0a" : "#ddd",
                            }}
                        >
                            {sport}
                        </button>
                    ))}
                </div>
            </div>

            {/* 리그 선택 */}
            {selectedSport && (
                <div style={{ marginBottom: "30px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {sportsData[selectedSport].leagues
                            .filter((team) => team !== "ALL")
                            .map((league) => (
                                <button
                                    key={league}
                                    type="button"
                                    onClick={() => handleLeagueSelect(league)}
                                    style={{
                                        margin: "5px",
                                        padding: "10px",
                                        backgroundColor:
                                            selectedLeague === league ? "#90ee90" : "#ddd",
                                    }}
                                >
                                    {league}
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {/* 팀 선택 */}
            {selectedLeague && selectedLeague && (
                <div style={{ marginBottom: "30px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {sportsData[selectedSport].teams[selectedLeague]
                            .filter((team) => team !== "ALL")
                            .map((team) => (
                                <button
                                    key={team}
                                    type="button"
                                    onClick={() => handleTeamSelect(selectedLeague, team)}
                                    style={{
                                        margin: "5px",
                                        padding: "10px",
                                        backgroundColor:
                                            selectedTeams[selectedLeague] === team
                                                ? "#add8e6"
                                                : "#ddd",
                                    }}
                                >
                                    {team}
                                </button>
                            ))}
                    </div>
                </div>
            )}

            {/* 선택된 팀 목록 */}
            <div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {Object.keys(selectedTeams).map((league) =>
                        selectedTeams[league] ? (
                            <div
                                key={league}
                                style={{
                                    margin: "10px",
                                    padding: "10px",
                                    border: "1px solid black",
                                    borderRadius: "20px",
                                }}
                            >
                                <span>{selectedTeams[league]}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTeam(league)}
                                    style={{
                                        marginLeft: "10px",
                                        padding: "5px",
                                        backgroundColor: "#ff6961",
                                        color: "white",
                                        borderRadius: "5px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tttt;
