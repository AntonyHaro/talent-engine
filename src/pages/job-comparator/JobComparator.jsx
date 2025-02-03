import { useState } from "react";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";

import ReturnHome from "../../components/return-home/ReturnHome";
import SubmitButton from "../../components/submit-button/SubmitButton";
import FormCard from "../../components/form-card/FormCard";
import Actions from "../../components/actions/Actions";

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
    const [comparison, setComparison] = useState(null);

    const handleJobChange = (index, field, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][field] = value;
        setJobs(updatedJobs);
        console.log(jobs);
    };

    const handleAdd = () => {
        setJobs([...jobs, { title: "", description: "", salary: "" }]);
    };

    const handleReset = () => {
        setJobs([
            { title: "", description: "", salary: "" },
            { title: "", description: "", salary: "" },
        ]);
    };

    const handleSubmit = async () => {
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
            <div className={styles.jobForms}>
                {jobs.map((job, index) => (
                    <FormCard key={index}>
                        <h3>
                            Vaga {index + 1}
                            {job.title != "" ? ` - ${job.title}` : ""}
                        </h3>
                        <div className={styles.inputContainer}>
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
                    </FormCard>
                ))}
            </div>

            <Actions
                onSubmit={handleSubmit}
                onAdd={handleAdd}
                onReset={handleReset}
                submitButtonText={"Fazer Comparação"}
                loading={loading}
                addButtonText={"+ Vaga"}
            />

            {error && <p className={styles.error}>Erro: {error}</p>}
            {comparison && <MarkdownComponent>{comparison}</MarkdownComponent>}
        </main>
    );
}
