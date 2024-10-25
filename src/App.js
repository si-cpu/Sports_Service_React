// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GameDetail from "./pages/GameDetail";
import GameList from "./pages/GameList";
import TeamDetail from "./pages/TeamDetail";
import SignUp from "./pages/SignUp";
import AccountModify from "./pages/AccountModify";
import BoardList from "./pages/BoardList";
import Header from "./components/Header";
import TeamChoose from "./pages/TeamChoose";
import BoardComponent from "./components/BoardComponent";
import SignIn from "./components/SignIn";
import "./App.css";
import { AuthProvider } from "./auth-context"; // Correct import

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  return (
    <AuthProvider value={{ currentUser, setCurrentUser }}>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/game/list" element={<GameList />} />
              <Route path="/game/detail/:game_id" element={<GameDetail />} />
              <Route path="/team/:team_id" element={<TeamDetail />} />
              <Route path="/board/list" element={<BoardList />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account/modify" element={<AccountModify />} />
              <Route path="/signup/teamchoose" element={<TeamChoose />} />
              <Route path="/board/component" element={<BoardComponent />} />
              <Route path="/component/SignIn" element={<SignIn />} />
              <Route path="/component/Header" element={<Header />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
