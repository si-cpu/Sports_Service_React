import React, { useState, useEffect } from "react";
import axios from "axios";

const BasketballLineup = ({ gameId, homeTeamName, awayTeamName }) => {
    const [lineups, setLineups] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/record`;
        axios.get(url).then((response) => setLineups(response.data.result.recordData));
    }, [gameId]);

    if (!lineups) {
        return <div>Loading game records...</div>;
    }

    const homeTeam = lineups.homePlayerStats;
    const awayTeam = lineups.awayPlayerStats;

    const renderPlayers = (team) => {
        return team.map((player, index) => (
            <div key={index} className="lineup-row">
                <div key={player.playerId} className="player">
                    <span className="player-number">{player.backNum}</span>
                    <span className="player-number">{player.jersey}</span>
                    <span className="player-name">{player.playerName}</span>
                    <span className="player-name">{player.lastName}</span>
                </div>
            </div>
        ));
    };

    return (
        <div className="lineup-container">
            <h1>{homeTeamName}</h1>
            <div className="team-lineup">
                <div className="formation">{renderPlayers(homeTeam)}</div>
            </div>

            <h1>{awayTeamName}</h1>
            <div className="team-lineup">
                <div className="formation">{renderPlayers(awayTeam)}</div>
            </div>
        </div>
    );
};

export default BasketballLineup;
