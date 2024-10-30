export const buildApiUrls = (selectedSport, selectedLeague, selectedDate) => {
    // 초기화 및 공통 URL 처리
    let apiUrls = [];
    let apiUrl =
        "/game/games?fields=basic%2CsuperCategoryId%2CcategoryName%2Cstadium%2CstatusNum%2CgameOnAir%2ChasVideo%2Ctitle%2CspecialMatchInfo%2CroundCode%2CseriesOutcome%2CseriesGameNo%2";

    // MYTEAM 데이터 불러오기
    if (selectedSport === "myteam") {
        // KBO 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=kbaseball&categoryId=kbo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );

        // MLB 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `ChomeStarterName%2CawayStarterName%2CwinPitcherName%2ClosePitcherName%2ChomeCurrentPitcherName%2CawayCurrentPitcherName%2CbroadChannel&upperCategoryId=wbaseball&categoryId=mlb&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );

        // K-리그 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `CmatchRound%2CroundTournamentInfo%2CphaseCode%2CgroupName%2Cleg%2ChasPtSore%2ChomePtScore%2CawayPtScore%2Cleague%2CleagueName%2CaggregateWinner%2CneutralGround%2Cpostponed&upperCategoryId=kfootball&categoryId=kleague&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );

        // 프리미어 리그 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `CmatchRound%2CroundTournamentInfo%2CphaseCode%2CgroupName%2Cleg%2ChasPtSore%2ChomePtScore%2CawayPtScore%2Cleague%2CleagueName%2CaggregateWinner%2CneutralGround%2Cpostponed&upperCategoryId=wfootball&categoryId=epl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );

        // 전체 농구 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `Cconference&superCategoryId=basketball&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );

        // 전체 배구 데이터 불러오기
        apiUrls.push(
            apiUrl +
                `Cround%2CgroupName&superCategoryId=volleyball&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`
        );
    }

    // BASEBALL 데이터 불러오기
    else if (selectedSport === "baseball") {
        // 전체 야구 데이터 불러오기
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

            // KBO 데이터 불러오기
            if (selectedLeague === "KBO") {
                apiUrl += `kbaseball&categoryId=kbo&fromDate=${selectedDate}&toDate=${selectedDate}&roundCodes=&size=500`;
                apiUrls.push(apiUrl);
            }

            // MLB 데이터 불러오기
            else if (selectedLeague === "MLB") {
                apiUrl += `wbaseball&categoryId=mlb&fromDate=${selectedDate}&toDate=${selectedDate}&roundCodes=&size=500`;
                apiUrls.push(apiUrl);
            }
        }
    }

    // SOCCER 데이터 불러오기
    else if (selectedSport === "soccer") {
        // 전체 축구 데이터 불러오기
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

            // K-리그 데이터 불러오기
            if (selectedLeague === "K-League") {
                apiUrl += `kfootball&categoryId=kleague&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
                apiUrls.push(apiUrl);
            }

            // 프리미어 리그 데이터 불러오기
            else if (selectedLeague === "Premier League") {
                apiUrl += `wfootball&categoryId=epl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
                apiUrls.push(apiUrl);
            }
        }
    }

    // BASKETBALL 데이터 불러오기
    else if (selectedSport === "basketball") {
        // 농구 공통 URL 처리
        apiUrl += "Cconference&superCategoryId=basketball&";

        // 전체 농구 데이터 불러오기
        if (selectedLeague === "ALL") {
            apiUrl += `fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }

        // KBL 데이터 불러오기
        else if (selectedLeague === "KBL") {
            apiUrl += `categoryId=kbl&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }

        // NBA 데이터 불러오기
        else if (selectedLeague === "NBA") {
            apiUrl += `categoryId=nba&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }
    }

    // VOLLEYBALL 데이터 불러오기
    else if (selectedSport === "volleyball") {
        // 배구 공통 URL 처리
        apiUrl += "Cround%2CgroupName&superCategoryId=volleyball&";

        // 전체 배구 데이터 불러오기
        if (selectedLeague === "ALL") {
            apiUrl += `fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }

        // 남자 배구 데이터 불러오기
        else if (selectedLeague === "V - League 남자부") {
            apiUrl += `categoryId=kovo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }

        // 여자 배구 데이터 불러오기
        else if (selectedLeague === "V - League 여자부") {
            apiUrl += `categoryId=wkovo&fromDate=${selectedDate}&toDate=${selectedDate}&size=500`;
            apiUrls.push(apiUrl);
        }
    }

    return apiUrls;
};
