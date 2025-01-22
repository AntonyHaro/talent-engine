import styles from "./SubmitButton.module.css";

export default function SubmitButton({ text, loadingMessage, loading }) {
    return (
        <button type="submit" className={styles.button} disabled={loading}>
            {loading ? loadingMessage : text}
        </button>
    );
}
