import { useState } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";

import ReturnHome from "../../components/return-home/ReturnHome";
import SubmitButton from "../../components/submit-button/SubmitButton";

import { MdOutlineSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { PiChatCenteredDotsBold } from "react-icons/pi";

import styles from "./JobComparator.module.css";

export default function JobComparator() {
    const [jobs, setJobs] = useState([
        { title: "", description: "", salary: "" },
        { title: "", description: "", salary: "" },
    ]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [comparison, setComparasion] = useState(null);

    const handleJobChange = (index, field, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][field] = value;
        setJobs(updatedJobs);
        console.log(jobs);
    };

    const addJob = () => {
        setJobs([...jobs, { title: "", description: "", salary: "" }]);
    };

    const resetComparison = () => {
        setJobs([
            { title: "", description: "", salary: "" },
            { title: "", description: "", salary: "" },
        ]);
    };

    const handleComparator = async () => {
        try {
            // Verifica se todas as descrições estão preenchidas
            const isDataComplete = jobs.every((job) => job.description);

            if (!isDataComplete) {
                setError(
                    "Preencha a descrição completa das vagas antes de comparar."
                );
                return;
            }

            setLoading(true);

            const response = await fetch("/api/jobs-comparator", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ jobs: jobs }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro no servidor.");
            }

            const data = await response.json();
            setComparasion(
                data.response || "Nenhuma resposta válida recebida."
            );
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.jobComparator}>
            <ReturnHome />
            <h1>⚖️ Comparador de Vagas</h1>
            <p>
                Adicione informações das vagas que deseja comparar e veja os
                resultados lado a lado.
            </p>
            <div className={styles.jobForms}>
                {jobs.map((job, index) => (
                    <div key={index} className={styles.jobForm}>
                        <h3>Vaga {index + 1}</h3>
                        <div className={styles.inputContainer}>
                            {/* Título da vaga */}
                            <div className={styles.input}>
                                <PiChatCenteredDotsBold />
                                <input
                                    type="text"
                                    placeholder="Título da vaga"
                                    value={job.title}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            {/* Descrição da vaga */}
                            <div className={styles.input}>
                                <MdOutlineSubtitles />
                                <textarea
                                    placeholder="Descrição da vaga"
                                    value={job.description}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        height: "180px",
                                        resize: "vertical",
                                    }}
                                />
                            </div>

                            {/* Salário (opcional) */}
                            <div className={styles.input}>
                                <RiMoneyDollarCircleLine />
                                <input
                                    type="text"
                                    placeholder="Salário (opcional)"
                                    value={job.salary}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "salary",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.actions}>
                <SubmitButton
                    text={"Fazer Comparação"}
                    loadingMessage={"Carregando..."}
                    loading={loading}
                    width={"30%"}
                    onClick={handleComparator}
                />
                <button className={styles.addButton} onClick={addJob}>
                    Adicionar Vaga
                </button>
                <button
                    className={styles.resetButton}
                    onClick={resetComparison}
                >
                    Reiniciar Comparação
                </button>
            </div>

            <MarkdownComponent>{comparison}</MarkdownComponent>
        </main>
    );
}
