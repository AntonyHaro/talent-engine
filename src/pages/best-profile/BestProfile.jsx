import { useState } from "react";
import axios from "axios";

import ReturnHome from "../../components/return-home/ReturnHome";
import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";
import SubmitButton from "../../components/submit-button/SubmitButton";
import Actions from "../../components/actions/Actions";

import { MdOutlineSubtitles } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { PiChatCenteredDotsBold } from "react-icons/pi";
import { TbStairsUp } from "react-icons/tb";
import { GrBook } from "react-icons/gr";

import styles from "./BestProfile.module.css";

function BestProfile() {
    const [job, setJob] = useState({
        title: "",
        level: "",
        sector: "",
        description: "",
        salary: "",
        jobLevel: "junior", // Adiciona a propriedade para armazenar o tipo da vaga
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [output, setOutput] = useState(null);

    const handleJobChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setJob({
            title: "",
            level: "",
            sector: "",
            description: "",
            salary: "",
            jobLevel: "junior",
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        setOutput(null);
        try {
            const { data } = await axios.post(
                "/api/best-profile",
                JSON.stringify({ job: job }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            setOutput(data.response);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.bestProfile}>
            <ReturnHome />
            <h1>😎 Gerador de Perfil Ideal</h1>
            <hr />
            <p className="info">
                Crie perfis otimizados para se destacar em Vagas e Mercados
                específicos, com recomendações personalizadas de habilidades e
                competências.
            </p>
            <div className={styles.form}>
                <div className={styles.multiColumn}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">
                            <PiChatCenteredDotsBold />
                            Título da Vaga
                        </label>
                        <input
                            type="text"
                            placeholder="Título da vaga:"
                            name="title"
                            id="title"
                            className={styles.jobTitle}
                            value={job.title}
                            onChange={handleJobChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="salary">
                            <RiMoneyDollarCircleLine />
                            Salário (opcional)
                        </label>
                        <input
                            type="text"
                            placeholder="Salário:"
                            name="salary"
                            id="salary"
                            value={job.salary}
                            onChange={handleJobChange}
                        />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="description">
                        <MdOutlineSubtitles />
                        Descrição da Vaga
                    </label>
                    <textarea
                        placeholder="Descrição da vaga:"
                        name="description"
                        id="description"
                        value={job.description}
                        onChange={handleJobChange}
                        style={{ height: "180px", resize: "vertical" }}
                    />
                </div>

                <div className={styles.jobLevelContainer}>
                    {[
                        "junior",
                        "mid-level",
                        "senior",
                        "manager",
                        "executive",
                    ].map((type) => (
                        <label
                            key={type}
                            className={`${styles.jobLevel} ${
                                job.jobLevel === type ? styles.selected : ""
                            }`}
                            style={{ display: "block", cursor: "pointer" }}
                        >
                            {type === "junior" && "Júnior"}
                            {type === "mid-level" && "Pleno"}
                            {type === "senior" && "Sênior"}
                            {type === "manager" && "Gerente"}
                            {type === "executive" && "Executivo"}

                            <input
                                type="radio"
                                name="jobLevel"
                                value={type}
                                checked={job.jobLevel === type}
                                onChange={() =>
                                    setJob((prevJob) => ({
                                        ...prevJob,
                                        jobLevel: type,
                                    }))
                                }
                            />
                        </label>
                    ))}
                </div>
            </div>

            <Actions
                onSubmit={handleSubmit}
                onReset={handleReset}
                submitButtonText={"Gerar Perfil"}
                loading={loading}
                addButtonText={"+ Candidato"}
            />

            {error && <p className={styles.error}>Erro: {error}</p>}
            {output && <MarkdownComponent>{output}</MarkdownComponent>}
        </main>
    );
}

export default BestProfile;
