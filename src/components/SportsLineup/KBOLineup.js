import React, { useState, useEffect } from "react";
import "../../css/BaseballLineup.css";
import axios from "axios";

const KBOLineup = ({ gameId }) => {
    const [lineups, setLineups] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/preview`;
        axios.get(url).then((response) => setLineups(response.data.result.previewData));
    }, [gameId]);

    if (!lineups) {
        return <div>Loading game records...</div>;
    }

    return (
        <div className="lineup-container">
            {/* Starting Lineups */}
            <div className="starting-lineup">
                {/* home 라인업 */}
                <div className="team-lineup">
                    <h2>{lineups.gameInfo.hName}</h2>
                    <div className="players-list">
                        {lineups.homeTeamLineUp.fullLineUp.map((player, index) => (
                            <div key={index} className="player">
                                <span className="player-number">
                                    {player.positionName === "선발투수" ? "선발" : index}
                                </span>
                                <div className="player-info">
                                    <span className="player-name">{player.playerName}</span>
                                    <span className="player-position">
                                        {player.positionName} {player.batsThrows}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* away 라인업 */}
                <div className="team-lineup">
                    <h2>{lineups.gameInfo.aName}</h2>
                    <div className="players-list">
                        {lineups.awayTeamLineUp.fullLineUp.map((player, index) => (
                            <div key={index} className="player">
                                <span className="player-number">
                                    {player.positionName === "선발투수" ? "선발" : index}
                                </span>
                                <div className="player-info">
                                    <span className="player-name">{player.playerName}</span>
                                    <span className="player-position">
                                        {player.positionName}, {player.batsThrows}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Substitutes and Bullpen */}
            <div className="substitutes-bullpen">
                <div className="team-subs">
                    {/* home 후보 야수 */}
                    <h3>Substitutes</h3>
                    <div className="subs-list">
                        {lineups.homeTeamLineUp.batterCandidate.map((player, index) => (
                            <div key={index} className="sub-player">
                                <span>
                                    {player.playerName} {player.position}, {player.batsThrows}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* home 불펜 */}
                    <h3>Bullpen</h3>
                    <div className="bullpen-list">
                        {lineups.homeTeamLineUp.pitcherBullpen.map((player, index) => (
                            <div key={index} className="bullpen-player">
                                <span>
                                    {player.playerName} {player.hitType}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* away 후보 야수 */}
                <div className="team-subs">
                    <h3>Substitutes</h3>
                    <div className="subs-list">
                        {lineups.awayTeamLineUp.batterCandidate.map((player, index) => (
                            <div key={index} className="sub-player">
                                <span>
                                    {player.playerName} {player.position}, {player.batsThrows}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* home 불펜 */}
                    <h3>Bullpen</h3>
                    <div className="bullpen-list">
                        {lineups.awayTeamLineUp.pitcherBullpen.map((player, index) => (
                            <div key={index} className="bullpen-player">
                                <span>
                                    {player.playerName} {player.hitType}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KBOLineup;
