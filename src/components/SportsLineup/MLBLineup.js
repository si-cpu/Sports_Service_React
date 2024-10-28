import React, { useState, useEffect } from "react";
import "../../css/BaseballLineup.css";
import axios from "axios";

const MLBLineup = ({ gameId }) => {
    const [lineups, setLineups] = useState(null);
    const [homeName, setHomeName] = useState("");
    const [awayName, setAwayName] = useState("");

    useEffect(() => {
        const record_url = `/game/games/${gameId}/record`;
        axios.get(record_url).then((response) => setLineups(response.data.result.recordData));
    }, [gameId]);

    useEffect(() => {
        const game_url = `/game/games/${gameId}`;
        axios.get(game_url).then((response) => {
            const gameData = response.data.result.game;
            setHomeName(gameData.homeTeamName);
            setAwayName(gameData.awayTeamName);
        });
    }, [gameId]);

    if (!lineups) {
        return <div>Loading game records...</div>;
    }

    return (
        <div className="lineup-container">
            {/* Hitcher */}
            <div className="starting-lineup">
                {/* home 라인업 */}
                <div className="team-lineup">
                    <h2>{homeName}</h2>
                    <div className="players-list">
                        {lineups.homeBatter.map((player, index) => (
                            <div key={index} className="player">
                                <div className="player-info">
                                    <span className="player-name">{player.name}</span>
                                    <span className="player-position">{player.posName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* away 라인업 */}
                <div className="team-lineup">
                    <h2>{awayName}</h2>
                    <div className="players-list">
                        {lineups.awayBatter.map((player, index) => (
                            <div key={index} className="player">
                                <div className="player-info">
                                    <span className="player-name">{player.name}</span>
                                    <span className="player-position">{player.posName}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pitcher */}
            <div className="substitutes-bullpen">
                <div className="team-subs">
                    {/* home 라인업 */}
                    <h3>Substitutes</h3>
                    <div className="subs-list">
                        {lineups.homePitcher.map((player, index) => (
                            <div key={index} className="sub-player">
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* away 라인업 */}
                <div className="team-subs">
                    <h3>Substitutes</h3>
                    <div className="subs-list">
                        {lineups.awayPitcher.map((player, index) => (
                            <div key={index} className="sub-player">
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MLBLineup;
