import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GameDetail from "./pages/GameDetail";
import GameList from "./pages/GameList";
import BoardList from "./pages/BoardList";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import AccountModify from "./pages/AccountModify";
import BoardComponent from "./components/BoardComponent";
import TeamDetail from "./pages/TeamDetail";
import TeamChoose from "./components/TeamChoose";

import { AuthProvider } from "./auth-context";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header className="header" />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/game/list" element={<GameList />} />
              <Route path="/game/detail/:gameId" element={<GameDetail />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup/teamchoose" element={<TeamChoose />} />
              <Route path="/account/modify" element={<AccountModify />} />
              <Route path="/board/list" element={<BoardList />} />
              <Route path="/board/componenSt" element={<BoardComponent />} />
              <Route path="/team/detail" element={<TeamDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
