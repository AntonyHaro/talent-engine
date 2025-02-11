import styles from "./SubmitButton.module.css";
import { PulseLoader } from "react-spinners";

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
            {loading ? (
                <>
                    <PulseLoader color="gray" size={5} />
                    <span> {loadingMessage}</span>
                </>
            ) : (
                text
            )}
        </button>
    );
}
