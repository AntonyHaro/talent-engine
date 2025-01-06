import { Routes, Route } from "react-router-dom";
import JobFinder from "./pages/JobFinder/JobFinder";
import Curriculum from "./pages/Curriculum/Curriculum";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";

function App() {
    return (
        <div>
            {/* Navegação */}
            {/* <nav>
                <Link to="/jobs">JobFinder</Link>
                <Link to="/cv">Curriculum</Link>
            </nav> */}

            <Header />

            {/* Configuração de Rotas */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobFinder />} />
                <Route path="/cv" element={<Curriculum />} />
            </Routes>
        </div>
    );
}

export default App;
