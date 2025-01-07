import { LuGlasses } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <h1>
                <div className={styles.svg}>
                    <FaGear />
                </div>
                Talent Engine
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link to={"/cv"}>CV Analyzer</Link>
                    </li>
                    <li>
                        <Link to={"/jobs"}>Job Finder</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
