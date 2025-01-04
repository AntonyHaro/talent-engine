import Link from "next/link";
import styles from "./page.module.css";

export default function Page() {
    return (
        <>
            <h1>Talent Engine</h1>
            <div className={styles.linkContainer}>
                <Link href="./cv">CV Analyzer</Link>
                <Link href="./jobs">Job Finder</Link>
            </div>
        </>
    );
}
