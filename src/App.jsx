import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import CvAnalyzer from "./pages/cv-analyzer/CvAnalyzer";
import BestProfile from "./pages/best-profile/BestProfile";
import Profile from "./pages/profile/Profile";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/cv-analyzer" element={<CvAnalyzer />} />
                <Route path="/best-profile" element={<BestProfile />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
