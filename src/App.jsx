import { Routes, Route } from "react-router-dom";
import JobFinder from "./pages/JobFinder/JobFinder";
import Curriculum from "./pages/Curriculum/Curriculum";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import "./App.css";

function App() {
    return (
        <div>
            {/* <Header /> */}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobFinder />} />
                <Route path="/cv" element={<Curriculum />} />
            </Routes>
        </div>
    );
}

export default App;
