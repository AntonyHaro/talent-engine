import { useState } from "react";
import ReturnHome from "../../components/return-home/ReturnHome";
import { MdOutlineSubtitles } from "react-icons/md"; //job title
import { RiMoneyDollarCircleLine } from "react-icons/ri"; //salary
import { FiMapPin } from "react-icons/fi"; //local
import { AiOutlineLike } from "react-icons/ai"; //benefits
import { TbWorldCheck } from "react-icons/tb"; //culture

import styles from "./JobComparator.module.css";

export default function JobComparator() {
    const [jobs, setJobs] = useState([
        { title: "", salary: "", location: "", benefits: "", culture: "" },
        { title: "", salary: "", location: "", benefits: "", culture: "" },
    ]);

    const handleJobChange = (index, field, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][field] = value;
        setJobs(updatedJobs);
    };

    const addJob = () => {
        setJobs([
            ...jobs,
            { title: "", salary: "", location: "", benefits: "", culture: "" },
        ]);
    };

    const resetComparison = () => {
        setJobs([
            { title: "", salary: "", location: "", benefits: "", culture: "" },
            { title: "", salary: "", location: "", benefits: "", culture: "" },
        ]);
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
                            <div className={styles.input}>
                                <MdOutlineSubtitles />
                                <input
                                    type="text"
                                    placeholder="Título da vaga"
                                    style={{ marginBottom: "1%" }}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "title",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.multiColumn}>
                                <div className={styles.input}>
                                    <RiMoneyDollarCircleLine />
                                    <input
                                        type="text"
                                        placeholder="Salário"
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
                                <div className={styles.input}>
                                    <FiMapPin />
                                    <input
                                        type="text"
                                        placeholder="Localização"
                                        value={job.location}
                                        onChange={(e) =>
                                            handleJobChange(
                                                index,
                                                "location",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className={styles.input}>
                                <AiOutlineLike />
                                <input
                                    type="text"
                                    placeholder="Benefícios"
                                    value={job.benefits}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "benefits",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.input}>
                                <TbWorldCheck />
                                <input
                                    type="text"
                                    placeholder="Cultura Organizacional"
                                    value={job.culture}
                                    onChange={(e) =>
                                        handleJobChange(
                                            index,
                                            "culture",
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

            <table className={styles.comparisonTable}>
                <thead>
                    <tr>
                        <th>Critérios</th>
                        {jobs.map((_, index) => (
                            <th key={index}>Vaga {index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Título</td>
                        {jobs.map((job, index) => (
                            <td key={index}>{job.title || "—"}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Salário</td>
                        {jobs.map((job, index) => (
                            <td key={index}>{job.salary || "—"}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Localização</td>
                        {jobs.map((job, index) => (
                            <td key={index}>{job.location || "—"}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Benefícios</td>
                        {jobs.map((job, index) => (
                            <td key={index}>{job.benefits || "—"}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>Cultura Organizacional</td>
                        {jobs.map((job, index) => (
                            <td key={index}>{job.culture || "—"}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </main>
    );
}
