import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import JobFinder from "./pages/job-finder/JobFinder";
import CvAnalyzer from "./pages/cv-analyzer/CvAnalyzer";
import JobComparator from "./pages/job-comparator/JobComparator";
import BestProfile from "./pages/best-profile/BestProfile";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job-finder" element={<JobFinder />} />
                <Route path="/cv-analyzer" element={<CvAnalyzer />} />
                <Route path="/job-comparator" element={<JobComparator />} />
                <Route path="/best-profile" element={<BestProfile />} />
            </Routes>
        </div>
    );
}

export default App;
