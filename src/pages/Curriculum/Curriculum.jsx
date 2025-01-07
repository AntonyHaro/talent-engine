import { useState } from "react";
import { LuGlasses } from "react-icons/lu";
import styles from "./Curriculum.module.css";
import ReactMarkdown from "react-markdown";

export default function Curriculum() {
    const [file, setFile] = useState(null);
    const [job, setJob] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleJobChange = (event) => {
        setJob(event.target.value);
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
        formData.append("job", job);

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/cv/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro no servidor.");
            }

            const data = await response.json();
            setOutput(data.response || "Nenhuma resposta válida recebida.");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.cv}>
            <h1 className={styles.title}>
                <div className={styles.svg}>
                    <LuGlasses />
                </div>
                Analisador de Currículos
            </h1>
            <p style={{ color: "gray", marginBottom: "3%" }}>
                Adicione o currículo e as informações da vaga para inciar a
                análise com a Inteligência Artificial.
            </p>
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
                    name="file-input"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                />
                <textarea
                    value={job}
                    onChange={handleJobChange}
                    placeholder="Insira a descrição da vaga aqui..."
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={styles.button}
                >
                    {loading ? "Carregando..." : "Carregar análise!"}
                </button>
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            <div className={styles.output}>
                <ReactMarkdown>{output}</ReactMarkdown>
            </div>
        </main>
    );
}
