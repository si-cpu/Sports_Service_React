import React, { useState, useEffect } from "react";
import axios from "axios";

const SoccerLineup = ({ gameId, gameLeague, homeTeamName, awayTeamName }) => {
    const [lineups, setLineups] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/lineup`;
        axios.get(url).then((response) => setLineups(response.data.result.lineUpData));
    }, [gameId]);

    if (!lineups) {
        return <div>Loading game records...</div>;
    }

    const homeTeam = lineups.lineup.home.players;
    const awayTeam = lineups.lineup.away.players;
    const homeSubs = lineups.substitution.home;
    const awaySubs = lineups.substitution.away;

    const renderPlayers = (team) => {
        return team.map((line, index) => (
            <div key={index} className="lineup-row">
                {line.map((player) => (
                    <div key={player.playerId} className="player">
                        <span className="player-number">{player.shirtNumber}</span>
                        <span className="player-name">{player.name}</span>
                    </div>
                ))}
            </div>
        ));
    };

    const renderSubstitutions = (subs) => {
        return subs.map((sub, index) => (
            <div key={index} className="substitution-item">
                <div className="sub-player-name">{sub.name}</div>
            </div>
        ));
    };

    return (
        <div className="lineup-container">
            <h1>{homeTeamName}</h1>
            <div className="team-lineup">
                <h2>{homeTeam.formation}</h2>
                <div className="formation">
                    {renderPlayers(gameLeague === "kleague" ? homeTeam : homeTeam.lineup)}
                </div>
            </div>

            <h1>{awayTeamName}</h1>
            <div className="team-lineup">
                <h2>{awayTeam.formation}</h2>
                <div className="formation">
                    {renderPlayers(gameLeague === "kleague" ? awayTeam : awayTeam.lineup)}
                </div>
            </div>

            <h1>{homeTeamName}</h1>
            <div className="substitutions">
                <div className="home-subs">
                    <h3>Home Substitutes</h3>
                    {renderSubstitutions(gameLeague === "kleague" ? homeSubs : homeSubs.players)}
                </div>

                <h1>{awayTeamName}</h1>
                <div className="away-subs">
                    <h3>Away Substitutes</h3>
                    {renderSubstitutions(gameLeague === "kleague" ? awaySubs : awaySubs.players)}
                </div>
            </div>
        </div>
    );
};

export default SoccerLineup;
