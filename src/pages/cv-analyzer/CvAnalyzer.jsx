import { useState } from "react";
import axios from "axios";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";
import ReturnHome from "../../components/return-home/ReturnHome";
import SubmitButton from "../../components/submit-button/SubmitButton";

import { MdOutlinePersonOutline } from "react-icons/md";

import styles from "./CvAnalyzer.module.css";


export default function CvAnalyzer() {
    const [file, setFile] = useState(null);
    const [job, setJob] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleJobChange = (event) => {
        setJob(event.target.value);
    };

    const handleAnalysis = async () => {
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
        formData.append("message", job);

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const { data } = await axios.post(
                "http://localhost:5000/cv-analyzer",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setAnalysis(data.response);
        } catch (error) {
            console.log(error);
            setError(error || "Erro ao conectar com o servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.cvAnalyzer}>
            <ReturnHome />
            <h1 className={styles.title}>
                👤 Analisador de Currículos Profissionais
            </h1>
            <p>
                Adicione o currículo e as informações da vaga para inciar a
                análise com a Inteligência Artificial.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAnalysis();
                }}
                className={styles.form}
            >
                <div className={styles.cvForms}>
                    <div className={styles.cvForm}>
                        <h3>
                            <MdOutlinePersonOutline /> Candidato 1
                        </h3>
                        <div className={styles.input}>
                            <p>
                                Anexe o currículo do candidato no formato PDF:
                            </p>
                            <input
                                type="file"
                                id="file-input"
                                name="file-input"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />
                        </div>
                        <div className={styles.input}>
                            <textarea
                                value={job}
                                onChange={handleJobChange}
                                placeholder="Obervações do candidato (opcional):"
                                style={{ height: "100px", resize: "vertical" }}
                            />
                        </div>
                    </div>
                </div>

                <SubmitButton
                    text={"Carregar Análise"}
                    loadingMessage={"Carregando..."}
                    loading={loading}
                    width={"30%"}
                />
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            <MarkdownComponent>{analysis}</MarkdownComponent>
        </main>
    );
}
