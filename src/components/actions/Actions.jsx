import styles from "./Actions.module.css";
import PropTypes from "prop-types";
import SubmitButton from "../components/submit-button/SubmitButton";

export default function Actions({
    onCompare,
    onAddJob,
    onReset,
    compareText = "Fazer Comparação",
    loadingMessage = "Carregando...",
    loading = false,
    addJobText = "+ Vaga",
    resetText = "Reiniciar Comparação",
}) {
    return (
        <div className={styles.actions}>
            <SubmitButton
                text={compareText}
                loadingMessage={loadingMessage}
                loading={loading}
                width={"30%"}
                onClick={onCompare}
            />
            <button className={styles.addButton} onClick={onAddJob}>
                {addJobText}
            </button>
            <button className={styles.resetButton} onClick={onReset}>
                {resetText}
            </button>
        </div>
    );
}
