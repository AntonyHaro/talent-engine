import { Routes, Route } from "react-router-dom";
import JobFinder from "./pages/job-finder/JobFinder";
import CurriculumAnalyzer from "./pages/curriculum-analyzer/CurriculumAnalyzer"
import Home from "./pages/home/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/job-finder" element={<JobFinder />} />
                <Route path="/cv-analyzer" element={<CurriculumAnalyzer />} />
            </Routes>
        </div>
    );
}

export default App;
