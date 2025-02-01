import styles from "./FormCard.module.css"

function FormCard({ children }) {
    return <div className={styles.formCard}>{children}</div>;
}

export default FormCard;
