import styles from "./SubmitButton.module.css";

export default function SubmitButton({
    text,
    loadingMessage,
    loading,
    width,
    onClick,
}) {
    return (
        <button
            type="submit"
            className={styles.button}
            style={{ width: width }}
            disabled={loading}
            onClick={onClick || null}
        >
            {loading ? loadingMessage : text}
        </button>
    );
}
