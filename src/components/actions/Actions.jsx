import styles from "./Actions.module.css";
import SubmitButton from "../submit-button/SubmitButton";

export default function Actions({
    onSubmit,
    onAdd,
    onReset,
    submitButtonText,
    loadingMessage = "Carregando...",
    loading = false,
    addButtonText,
}) {
    return (
        <div className={styles.actions}>
            <SubmitButton
                text={submitButtonText}
                loadingMessage={loadingMessage}
                loading={loading}
                width={"30%"}
                onClick={onSubmit}
            />
            {onAdd && (
                <button className={styles.addButton} onClick={onAdd}>
                    {addButtonText}
                </button>
            )}
            <button className={styles.resetButton} onClick={onReset}>
                Limpar Campos
            </button>
        </div>
    );
}
