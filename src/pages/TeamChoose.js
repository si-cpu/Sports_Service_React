import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TeamData from "../data/TeamData";

const ImageGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

const ImageButton = styled.button`
  width: 200px;
  height: 100px;
  border: none;
  cursor: pointer;
  outline: none;
  background-size: cover;
  background-position: center;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
`;

const TeamChoose = ({ onTeamSelect }) => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [leagueLogo, setLeagueLogo] = useState(null); // 추가된 상태 변수

  // 리그 클릭 핸들러
  const handleLeagueClick = (leagueNum) => {
    setSelectedLeague(leagueNum);
    setSelectedTeams(TeamData[leagueNum]?.subAreas || []);
    setLeagueLogo(TeamData[leagueNum].logo); // 리그 로고 초기화
  };

  // 팀 클릭 핸들러
  const handleTeamClick = (team) => {
    alert(`팀을 선택하셨습니다: ${team.name}`);
    setSelectedTeam(team.num);
    setLeagueLogo(team.logo); // 선택된 팀의 로고로 리그 로고 변경

    // 팀 목록 닫기
    setSelectedLeague(null);
    // 선택된 리그와 팀 정보를 onTeamSelect로 전달
    onTeamSelect(team);
  };

  const leagueEntries = Object.entries(TeamData).map(([key, value]) => ({
    num: key,
    name: value.name,
    logo: value.logo,
  }));

  return (
    <>
      <h1>리그 선택</h1>
      {leagueLogo && (
        <img
          src={leagueLogo}
          alt="Selected League"
          style={{ width: "100px", height: "auto" }}
        />
      )}{" "}
      {/* 리그 로고 표시 */}
      <ImageGallery>
        {leagueEntries.map((league) => (
          <ImageButton
            key={league.num}
            onClick={() => handleLeagueClick(league.num)}
            selected={selectedLeague === league.num}
            style={{ backgroundImage: `url(${league.logo})` }}
          >
            {league.name}
          </ImageButton>
        ))}
      </ImageGallery>
      {selectedLeague && (
        <>
          <h2>{TeamData[selectedLeague].name} 팀 선택</h2>
          <ImageGallery>
            {selectedTeams.map((team) => (
              <ImageButton
                key={team.num}
                onClick={() => handleTeamClick(team)}
                selected={selectedTeam === team.num}
                style={{ backgroundImage: `url(${team.logo})` }}
              >
                {team.name}
              </ImageButton>
            ))}
          </ImageGallery>
        </>
      )}
    </>
  );
};

TeamChoose.propTypes = {
  onTeamSelect: PropTypes.func.isRequired,
};

export default TeamChoose;
