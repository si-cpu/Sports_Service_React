import React, { useEffect, useState } from "react";
import BaseballDetail from "../components/SportsDetail/BaseballDetail";
import SoccerDetail from "../components/SportsDetail/SoccerDetail";
import BasketballDetail from "../components/SportsDetail/BasketballDetail";
import VolleyballDetail from "../components/SportsDetail/VolleyballDetail";
import { useParams } from "react-router-dom";
import axios from "axios";

function GameDetail() {
    const { gameId } = useParams();
    const [gameData, setGameData] = useState(null);

    // 받은 id로 데이터 가져오기
    useEffect(() => {
        const newGameId = "/game/games/" + gameId;
        axios.get(newGameId).then((response) => {
            setGameData(response.data.result.game);
        });
    }, [gameId]);

    // 데이터 로딩 중
    if (!gameData) {
        return <div>Loading game data...</div>;
    }

    return (
        <div>
            {(gameData.categoryId === "kbo" || gameData.categoryId === "mlb") && (
                <BaseballDetail gameData={gameData} />
            )}
            {(gameData.categoryId === "kleague" || gameData.categoryId === "epl") && (
                <SoccerDetail gameData={gameData} />
            )}
            {(gameData.categoryId === "kbl" || gameData.categoryId === "nba") && (
                <BasketballDetail gameData={gameData} />
            )}
            {(gameData.categoryId === "kovo" || gameData.categoryId === "wkovo") && (
                <VolleyballDetail gameData={gameData} />
            )}
        </div>
    );
}

export default GameDetail;
