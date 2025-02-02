import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Jobs from "./pages/jobs/Jobs";
import CvAnalyzer from "./pages/cv-analyzer/CvAnalyzer";
import JobComparator from "./pages/job-comparator/JobComparator";
import BestProfile from "./pages/best-profile/BestProfile";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/cv-analyzer" element={<CvAnalyzer />} />
                <Route path="/job-comparator" element={<JobComparator />} />
                <Route path="/best-profile" element={<BestProfile />} />
            </Routes>
        </div>
    );
}

export default App;
