import React, { useState, useEffect } from "react";
import "../../css/BaseballRecord.css";
import KBORecord from "../SportsRecord/KBORecord";
import MLBRecord from "../SportsRecord/MLBRecord";
import axios from "axios";

function BaseballRecord({ gameId, gameLeague }) {
    const [records, setRecords] = useState(null);

    useEffect(() => {
        const url = `/game/games/${gameId}/record`;
        axios.get(url).then((response) => setRecords(response.data.result.recordData));
    }, [gameId]);

    if (!records) {
        return <div>Loading game records...</div>;
    }

    return (
        <div>
            {gameLeague === "kbo" ? (
                <KBORecord records={records} />
            ) : (
                <MLBRecord records={records} gameId={gameId} />
            )}
        </div>
    );
}

export default BaseballRecord;
