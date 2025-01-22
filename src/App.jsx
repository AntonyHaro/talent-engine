import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import JobFinder from "./pages/job-finder/JobFinder";
import CvAnalyzer from "./pages/cv-analyzer/CvAnalyzer";
import JobComparator from "./pages/job-comparator/JobComparator";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job-finder" element={<JobFinder />} />
                <Route path="/cv-analyzer" element={<CvAnalyzer />} />
                <Route path="/job-comparator" element={<JobComparator />} />
            </Routes>
        </div>
    );
}

export default App;
