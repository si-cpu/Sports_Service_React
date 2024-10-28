import React from "react";
import KBOLineup from "../SportsLineup/KBOLineup";
import MLBLineup from "../SportsLineup/MLBLineup";

const BaseballLineup = ({ gameId, gameLeague }) => {
    return (
        <div>
            {gameLeague === "kbo" ? <KBOLineup gameId={gameId} /> : <MLBLineup gameId={gameId} />}
        </div>
    );
};

export default BaseballLineup;
