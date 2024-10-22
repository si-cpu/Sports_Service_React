import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AccountModify from "./pages/AccountModify";
import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import GameDetail from "./pages/GameDetail";
import GameList from "./pages/GameList";
import MainPage from "./pages/MainPage";
import SignUp from "./pages/SignUp";
import TeamDetail from "./pages/TeamDetail";
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
                        <Route path="/board/list" element={<Board />} />
                        <Route path="/board/detail/:board_id" element={<BoardDetail />} />
                        <Route path="/team/:team_id" element={<TeamDetail />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/account/modify" element={<AccountModify />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
