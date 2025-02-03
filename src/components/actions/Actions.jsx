import styles from "./Actions.module.css";
import SubmitButton from "../submit-button/SubmitButton";

export default function Actions({
    onSubmit,
    submitButtonText,
    submitButtonWidth = "30%",
    loading = false,
    loadingMessage = "Carregando...",
    addButtonText,
    onAdd,
    onReset,
    marginBottom = true,
}) {
    return (
        <div className={styles.actions}>
            <SubmitButton
                text={submitButtonText}
                loadingMessage={loadingMessage}
                loading={loading}
                width={submitButtonWidth}
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
