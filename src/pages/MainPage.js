import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MainPage.css";
import BoardMainPage from "../components/BoaraMainPage";
import News from "./New";

const MainPage = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    const [games, setGames] = useState([]);

    // 선택 날짜가 하나라도 변할 때 마다 데이터 다시 호출
    useEffect(() => {
        setGames([]);

        const todayUrl = `/game/games?fields=basic%2CsuperCategoryId%2CcategoryName%2Cstadium%2CstatusNum%2CgameOnAir%2ChasVideo%2Ctitle%2CspecialMatchInfo%2CroundCode%2CseriesOutcome%2CseriesGameNo%2ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId&fromDate=${todayDate}&toDate=${todayDate}&size=500`;

        axios.get(todayUrl).then((response) => {
            const todayGames = response.data.result.games.filter(
                (game) =>
                    game.categoryId === "kbo" ||
                    game.categoryId === "mlb" ||
                    game.categoryId === "kleague" ||
                    game.categoryId === "epl" ||
                    game.categoryId === "nba" ||
                    game.categoryId === "kbl" ||
                    game.categoryId === "kovo" ||
                    game.categoryId === "wkovo"
            );

            setGames(todayGames);
        });
    }, []);

    return (
        <div className="main-page">
            <section className="content-container">
                <section className="main-pagetoday-matches">
                    <div className="matches-container">
                        {games.map((game) => (
                            <div className="match-card" key={game.gameId}>
                                <div className="teams">
                                    <div className="team">
                                        <img src={game.homeTeamLogoUrl} alt={game.homeTeamName} />
                                        <p>{game.homeTeamName}</p>
                                    </div>

                                    <div className="match-info">
                                        <p className="vs">VS</p>
                                        <p className="match-time">
                                            {game.gameDateTime.split("T")[1]}
                                        </p>
                                        {game.statusCode === "RESULT" ? (
                                            <p className="status">경기 종료</p>
                                        ) : (
                                            <p className="status">{game.statusInfo}</p>
                                        )}
                                    </div>

                                    <div className="team">
                                        <img src={game.awayTeamLogoUrl} alt={game.awayTeamName} />
                                        <p>{game.awayTeamName}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className="main-page-news">
                    {" "}
                    <News />
                </section>
                <section className="main-page-myTeam">{<div>내 팀 정보 표시</div>}</section>
                <section className="main-page-board">
                    <BoardMainPage />
                </section>
            </section>
        </div>
    );
};

export default MainPage;
