import React, { useState, useEffect } from "react";
import { buildApiUrls } from "../components/ApiUrlBuilder";
import DateList from "../components/DateList";
import { sportsData } from "../datas/sportsData";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth-context";
import axios from "axios";
import "../css/GameList.css";

function GameList() {
    const navigate = useNavigate();
    const { userData } = useAuth();
    const userTeams = {
        kbo: userData.kbo_team,
        mlb: userData.mlb_team,
        kleague: userData.kl_team,
        epl: userData.pl_team,
        kbl: userData.kbl_team,
        nba: userData.nba_team,
        kovo: userData.vman_team,
        wkovo: userData.vwo_team,
    };

    const today = new Date().toISOString().split("T")[0];

    const [selectedSport, setSelectedSport] = useState("myteam");
    const [selectedLeague, setSelectedLeague] = useState("ALL");
    const [selectedTeam, setSelectedTeam] = useState("ALL");
    const [selectedDate, setSelectedDate] = useState(today);
    const [games, setGames] = useState([]);

    const handleSportClick = (sport) => {
        setSelectedSport(sport);
        setSelectedLeague("ALL");
        setSelectedTeam("ALL");
    };

    const handleLeagueClick = (league) => {
        setSelectedLeague(league);
        setSelectedTeam("ALL");
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
    };

    // 선택한 종목에 맞게 리그 보여주기
    const getLeaguesForSelectedSport = () => {
        if (selectedSport) {
            return sportsData[selectedSport]?.leagues || [];
        }
        return [];
    };

    // 선택한 리그에 맞게 팀 보여주기
    const getTeamsForSelectedLeague = () => {
        if (selectedSport && selectedLeague) {
            return sportsData[selectedSport]?.teams[selectedLeague] || [];
        }
        return [];
    };

    // 선택 날짜가 하나라도 변할 때 마다 데이터 다시 호출
    useEffect(() => {
        setGames([]);

        const apiUrls = buildApiUrls(selectedSport, selectedLeague, selectedDate);

        if (apiUrls.length > 0) {
            axios.all(apiUrls.map((url) => axios.get(url))).then(
                axios.spread((...responses) => {
                    const combinedGames = responses.reduce((acc, response) => {
                        return [...acc, ...(response.data.result.games || [])];
                    }, []);

                    const filteredGames =
                        selectedTeam === "ALL"
                            ? combinedGames
                            : combinedGames.filter(
                                  (game) =>
                                      game.homeTeamName === selectedTeam ||
                                      game.awayTeamName === selectedTeam
                              );

                    // 농구랑 배구는 (nba, kbl), (kovo, wkovo) 말고 다른 리그도 가져와짐 -> 필터링
                    if (selectedSport === "myteam") {
                        const leagueFilterGames = filteredGames.filter(
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

                        const removeGames = leagueFilterGames.filter((game) => {
                            const league = game.categoryId;
                            const awayTeamMatch = userTeams[league] === game.awayTeamName;
                            const homeTeamMatch = userTeams[league] === game.homeTeamName;

                            return awayTeamMatch || homeTeamMatch;
                        });

                        setGames(removeGames);
                    } else if (selectedSport === "basketball") {
                        const removeGames = filteredGames.filter(
                            (game) => game.categoryId === "nba" || game.categoryId === "kbl"
                        );
                        setGames(removeGames);
                    } else if (selectedSport === "volleyball") {
                        const removeGames = filteredGames.filter(
                            (game) => game.categoryId === "kovo" || game.categoryId === "wkovo"
                        );
                        setGames(removeGames);
                    } else {
                        setGames(filteredGames);
                    }
                })
            );
        }
    }, [selectedSport, selectedLeague, selectedTeam, selectedDate]);

    // 데이터 호출중
    if (!games) {
        return <div>Loading game data...</div>;
    }

    // 리스트에서 경기 누르면 해당 상세 페이지로 이동
    const handleGameClick = (gameId) => {
        navigate(`/game/detail/${gameId}`);
    };

    return (
        <div className="game-list">
            {/* Sport Selection */}
            <div className="sport-selection scroll-container">
                <button
                    className={selectedSport === "myteam" ? "active" : ""}
                    onClick={() => handleSportClick("myteam")}
                >
                    My Team
                </button>
                <button
                    className={selectedSport === "baseball" ? "active" : ""}
                    onClick={() => handleSportClick("baseball")}
                >
                    Baseball
                </button>
                <button
                    className={selectedSport === "soccer" ? "active" : ""}
                    onClick={() => handleSportClick("soccer")}
                >
                    Soccer
                </button>
                <button
                    className={selectedSport === "basketball" ? "active" : ""}
                    onClick={() => handleSportClick("basketball")}
                >
                    Basketball
                </button>
                <button
                    className={selectedSport === "volleyball" ? "active" : ""}
                    onClick={() => handleSportClick("volleyball")}
                >
                    Volleyball
                </button>
            </div>

            {/* League Selection */}
            <div className="league-selection scroll-container">
                {getLeaguesForSelectedSport().map((league) => (
                    <button
                        key={league}
                        className={selectedLeague === league ? "active" : ""}
                        onClick={() => handleLeagueClick(league)}
                    >
                        {league}
                    </button>
                ))}
            </div>

            {/* Team Selection */}
            <div className="team-selection scroll-container">
                {getTeamsForSelectedLeague().map((team) => (
                    <button
                        key={team}
                        className={selectedTeam === team ? "active" : ""}
                        onClick={() => handleTeamClick(team)}
                    >
                        {team}
                    </button>
                ))}
            </div>

            {/* Date */}
            <div className="date-picker">
                <DateList selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>

            {/* Game List */}
            <div>
                <ul>
                    {games.map((game) => (
                        <li key={game.gameId} onClick={() => handleGameClick(game.gameId)}>
                            <p>{game.gameId}</p>
                            <p>
                                {game.homeTeamName} vs {game.awayTeamName} - {game.gameDateTime}
                            </p>
                            <p>
                                {game.homeTeamScore} : {game.awayTeamScore}
                            </p>
                            <p>Status: {game.statusInfo}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GameList;
