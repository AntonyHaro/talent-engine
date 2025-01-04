"use client";

import { useState } from "react";
import styles from "./cv.module.css";
import ReactMarkdown from "react-markdown";

export default function Page() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadAndSummarizePDF = async () => {
        if (!file) {
            alert("Nenhum arquivo selecionado.");
            return;
        }

        if (!file.name.endsWith(".pdf")) {
            alert("Somente arquivos PDF são suportados.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/cv", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro no servidor.");
            }

            const data = await response.json();
            console.log(data);
            console.log(data.response);
            setOutput(data.response || "Nenhuma resposta válida recebida.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.cv}>
            <h1>Analisador de Currículos</h1>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    uploadAndSummarizePDF();
                }}
                className={styles.form}
            >
                <input
                    type="file"
                    id="file-input"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.uploadButton}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            {output && (
                <div className={styles.output}>
                    <ReactMarkdown>{output}</ReactMarkdown>
                </div>
            )}
        </main>
    );
}
