import styles from "./SubmitButton.module.css";

export default function SubmitButton({ text, loadingMessage, loading, width }) {
    return (
        <button
            type="submit"
            className={styles.button}
            style={{ width: width }}
            disabled={loading}
        >
            {loading ? loadingMessage : text}
        </button>
    );
}
