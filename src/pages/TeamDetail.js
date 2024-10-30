import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import GameList from "../pages/GameList";
import "../css/TeamDetail.css";

const teams = [
  {
    id: "tigers",
    name: "기아 타이거즈",
    youtubeUrl: "https://www.youtube.com/embed/...",
  },
  {
    id: "bears",
    name: "두산 베어스",
    youtubeUrl: "https://www.youtube.com/embed/...",
  },
  {
    id: "twins",
    name: "LG 트윈스",
    youtubeUrl: "https://www.youtube.com/embed/...",
  },
  // ... 다른 팀들 추가
];

const TeamDetail = () => {
  const { teamId } = useParams();
  const [teamData, setTeamData] = useState({
    name: "",
    emblemUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    // 팀 ID에 따른 데이터 설정
    const currentTeam = teams.find((team) => team.id === teamId);
    if (currentTeam) {
      setTeamData(currentTeam);
    }
  }, [teamId]);

  return (
    <div className="team-detail-container">
      <header className="team-header">
        <img
          src={`/images/emblems/${teamId}.png`}
          alt={`${teamData.name} 엠블럼`}
          className="team-emblem"
        />
        <h1>{teamData.name}</h1>
      </header>

      <div className="team-content-grid">
        <div className="schedule-section">
          <GameList teamId={teamId} />
        </div>

        <div className="news-section"></div>

        <div className="youtube-section">
          <iframe
            src={teamData.youtubeUrl}
            width="100%"
            height="400"
            frameBorder="0"
            allowFullScreen
            title={`${teamData.name} YouTube`}
          />
        </div>

        <div className="board-section"></div>
      </div>

      <nav className="team-navigation">
        {teams.map((team) => (
          <Link to={`/team/${team.id}`} key={team.id}>
            <img
              src={`/images/emblems/${team.id}.png`}
              alt={`${team.name} 엠블럼`}
              className="nav-emblem"
            />
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TeamDetail;
