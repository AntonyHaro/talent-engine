import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./MarkdownComponent.module.css";

function MarkdownComponent({ children }) {
    return (
        <div className={styles.markdownComponent}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {children}
            </ReactMarkdown>
        </div>
    );
}

export default MarkdownComponent;
