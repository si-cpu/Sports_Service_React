import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GameDetail from "./pages/GameDetail";
import GameList from "./pages/GameList";
import TeamDetail from "./pages/TeamDetail";
import SignUp from "./pages/SignUp";
import AccountModify from "./pages/AccountModify";
import BoardList from "./pages/BoardList";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header className="header" />
        {/* <Sidebar /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/game/list" element={<GameList />} />
            <Route path="/game/detail/:game_id" element={<GameDetail />} />
            <Route path="/team/:team_id" element={<TeamDetail />} />
            <Route path="/Board/list" element={<BoardList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account/modify" element={<AccountModify />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
