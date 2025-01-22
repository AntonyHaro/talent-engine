import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import styles from "./ReturnHome.module.css";

export default function ReturnHome() {
    return (
        <Link to={"/"} className={styles.link}>
            <IoArrowBack /> <span>Voltar ao painel principal</span>
        </Link>
    );
}
