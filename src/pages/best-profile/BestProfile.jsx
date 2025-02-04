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
            console.log(data.response);
            setOutput(data.response);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.jobComparator}>
            <ReturnHome />
            <h1>😎 Gerador de Perfil Ideal para Vagas e Mercado</h1>
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
                            name="title"
                            placeholder="Título da vaga:"
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
                            name="salary"
                            placeholder="Salário:"
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
                        name="description"
                        placeholder="Descrição da vaga:"
                        value={job.description}
                        onChange={handleJobChange}
                        style={{ height: "180px", resize: "vertical" }}
                    />
                </div>

                <div className={styles.multiColumn}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="level">
                            <TbStairsUp />
                            Nível da Vaga/Experiência
                        </label>
                        <input
                            type="text"
                            name="level"
                            placeholder="Nível da Vaga:"
                            value={job.level}
                            onChange={handleJobChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="sector">
                            <GrBook />
                            Setor da Vaga
                        </label>
                        <input
                            type="text"
                            name="sector"
                            placeholder="Setor da vaga:"
                            value={job.sector}
                            onChange={handleJobChange}
                        />
                    </div>
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
