export const buildApiUrls = (selectedSport, selectedLeague, selectedDate) => {
    let apiUrls = [];
    let apiUrl =
        "/game/games?fields=basic%2CsuperCategoryId%2CcategoryName%2Cstadium%2CstatusNum%2CgameOnAir%2ChasVideo%2Ctitle%2CspecialMatchInfo%2CroundCode%2CseriesOutcome%2CseriesGameNo%2";

    if (selectedSport === "myteam") {
        apiUrl +=
            "ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=";
        if (selectedLeague === "KBO") {
            apiUrl += "kbaseball&categoryId=kbo";
        } else if (selectedLeague === "MLB") {
            apiUrl += "wbaseball&categoryId=mlb";
        }
    } else if (selectedSport === "baseball") {
        if (selectedLeague === "ALL") {
            apiUrls.push(
                apiUrl +
                    `ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=kbaseball&categoryId=kbo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
            );
            apiUrls.push(
                apiUrl +
                    `ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=wbaseball&categoryId=mlb&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
            );
        } else {
            apiUrl +=
                "ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=";
            if (selectedLeague === "KBO") {
                apiUrl += `kbaseball&categoryId=kbo&fromDate=${selectedDate}&toDate=${selectedDate}&roundCodes=&size=500`;
                apiUrls.push(apiUrl);
            } else if (selectedLeague === "MLB") {
                apiUrl += `wbaseball&categoryId=mlb&fromDate=${selectedDate}&toDate=${selectedDate}&roundCodes=&size=500`;
                apiUrls.push(apiUrl);
            }
        }
    } else if (selectedSport === "soccer") {
        if (selectedLeague === "ALL") {
            apiUrls.push(
                apiUrl +
                    `CmatchRound%2CroundTournamentInfo%2CphaseCode%2CgroupName%2Cleg%2ChasPtSore%2ChomePtScore%2CawayPtScore%2Cleague%2CleagueName%2CaggregateWinner%2CneutralGround%2Cpostponed&upperCategoryId=kfootball&categoryId=kleague&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
            );
            apiUrls.push(
                apiUrl +
                    `CmatchRound%2CroundTournamentInfo%2CphaseCode%2CgroupName%2Cleg%2ChasPtSore%2ChomePtScore%2CawayPtScore%2Cleague%2CleagueName%2CaggregateWinner%2CneutralGround%2Cpostponed&upperCategoryId=wfootball&categoryId=epl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
            );
        } else {
            apiUrl +=
                "CmatchRound%2CroundTournamentInfo%2CphaseCode%2CgroupName%2Cleg%2ChasPtSore%2ChomePtScore%2CawayPtScore%2Cleague%2CleagueName%2CaggregateWinner%2CneutralGround%2Cpostponed&upperCategoryId=";
            if (selectedLeague === "K-League") {
                apiUrl += `kfootball&categoryId=kleague&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
                apiUrls.push(apiUrl);
            } else if (selectedLeague === "Premier League") {
                apiUrl += `wfootball&categoryId=epl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
                apiUrls.push(apiUrl);
            }
        }
    } else if (selectedSport === "basketball") {
        apiUrl += "Cconference&superCategoryId=basketball&";
        if (selectedLeague === "ALL") {
            apiUrl += `fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        } else if (selectedLeague === "KBL") {
            apiUrl += `categoryId=kbl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        } else if (selectedLeague === "NBA") {
            apiUrl += `categoryId=nba&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }
    } else if (selectedSport === "volleyball") {
        apiUrl += "Cround%2CgroupName&superCategoryId=volleyball&";
        if (selectedLeague === "ALL") {
            apiUrl += `fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        } else if (selectedLeague === "V - League 남자부") {
            apiUrl += `categoryId=kovo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        } else if (selectedLeague === "V - League 여자부") {
            apiUrl += `categoryId=wkovo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }
    }

    return apiUrls;
};
