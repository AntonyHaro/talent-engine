import { LuGlasses } from "react-icons/lu";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>
                <div className={styles.svg}>
                    <LuGlasses />
                </div>
                Talent Engine
            </h1>
            <nav>
                <ul>
                    <li>
                        <Link href={"/cv"}>CV Analyzer</Link>
                    </li>
                    <li>
                        <Link href={"/jobs"}>Job Finder</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
