import { useState, useRef } from "react";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";
import ReturnHome from "../../components/return-home/ReturnHome";
import FormCard from "../../components/form-card/FormCard";
import Actions from "../../components/actions/Actions";

import { MdOutlinePersonOutline, MdOutlineSubtitles } from "react-icons/md";
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
    const [comparison, setComparison] = useState(null);
    const fileInputRefs = useRef([]);

    const handleJobChange = (index, field, value) => {
        setJobs((prevJobs) => {
            const updatedJobs = [...prevJobs];
            updatedJobs[index][field] = value;
            return updatedJobs;
        });
    };

    const handleAdd = () => {
        setJobs((prevJobs) => [
            ...prevJobs,
            { title: "", description: "", salary: "" },
        ]);
    };

    const handleReset = () => {
        setJobs([
            { title: "", description: "", salary: "" },
            { title: "", description: "", salary: "" },
        ]);
    };

    const handleSubmit = async () => {
        if (jobs.some((job) => !job.description)) {
            setError(
                "Preencha a descrição completa das vagas antes de comparar."
            );
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/jobs-comparator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobs }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro no servidor.");
            }

            const data = await response.json();
            setComparison(data.response || "Nenhuma resposta válida recebida.");
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
            <p className="info">
                Adicione informações das vagas que deseja comparar e veja os
                resultados lado a lado.
            </p>

            <FormCard>
                <h3>
                    <MdOutlinePersonOutline /> Candidato
                </h3>
                <p>Anexe o currículo do candidato no formato PDF:</p>
                <div className={styles.inputContainer}>
                    <div className={styles.input}>
                        <input type="text" placeholder="Nome do candidato:" />
                    </div>
                    <div className={styles.input}>
                        <input
                            type="file"
                            className={styles.fileInput}
                            ref={(el) => (fileInputRefs.current[0] = el)}
                        />
                    </div>
                </div>
            </FormCard>
            <div className={styles.jobForms}>
                {jobs.map((job, index) => (
                    <FormCard key={index}>
                        <h3>
                            Vaga {index + 1}
                            {job.title && ` - ${job.title}`}
                        </h3>
                        <hr />
                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <label>
                                    <PiChatCenteredDotsBold /> Título da Vaga:
                                </label>
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

                            <div className={styles.inputGroup}>
                                <label>
                                    <MdOutlineSubtitles /> Descrição da Vaga:
                                </label>
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

                            <div className={styles.inputGroup}>
                                <label>
                                    <RiMoneyDollarCircleLine /> Salário
                                    (opcional):
                                </label>
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
                    </FormCard>
                ))}
            </div>

            <Actions
                onSubmit={handleSubmit}
                onAdd={handleAdd}
                onReset={handleReset}
                submitButtonText="Fazer Comparação"
                loading={loading}
                addButtonText="+ Vaga"
            />

            {error && <p className={styles.error}>Erro: {error}</p>}
            {comparison && <MarkdownComponent>{comparison}</MarkdownComponent>}
        </main>
    );
}
