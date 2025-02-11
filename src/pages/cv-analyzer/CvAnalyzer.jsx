import { useState, useRef } from "react";
import axios from "axios";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";
import ReturnHome from "../../components/return-home/ReturnHome";
import Actions from "../../components/actions/Actions";
import FormCard from "../../components/form-card/FormCard";

import { MdOutlineSubtitles } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { PiChatCenteredDotsBold } from "react-icons/pi";

import styles from "./CvAnalyzer.module.css";

export default function CvAnalyzer() {
    const [cvFiles, setCvFiles] = useState([{ file: null }]);
    const [job, setJob] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const fileInputRefs = useRef([]);

    const handleReset = () => {
        setCvFiles([null]);
        setJob("");
        fileInputRefs.current.forEach((ref) => {
            if (ref) ref.value = "";
        });
    };

    const handleAdd = () => {
        if (cvFiles.length < 4) {
            setCvFiles([...cvFiles, { file: null }]);
            return;
        }

        alert("É possível comparar até 4 candidatos!");
    };

    const handleFileChange = (event, index) => {
        const newFiles = [...cvFiles];
        newFiles[index] = { file: event.target.files[0] };
        setCvFiles(newFiles);
    };

    const handleJobChange = (e) => {
        const { name, value } = e.target;
        setJob((prevJob) => ({
            ...prevJob,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (cvFiles.length === 0 || cvFiles.some((cv) => !cv.file)) {
            alert("Selecione pelo menos um arquivo de currículo.");
            return;
        }

        if (cvFiles.some((cv) => !cv.file.name.endsWith(".pdf"))) {
            alert("Todos os arquivos devem estar no formato PDF.");
            return;
        }

        const formData = new FormData();
        cvFiles.forEach((cv, index) => {
            formData.append(`file`, cv.file);
            console.log(cv.file);
        });

        formData.append("job", job);

        setLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const { data } = await axios.post("/api/cv-analyzer", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(data);
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
            <hr />
            <p className="info">
                Adicione currículos e as informações da vaga para iniciar a
                análise com a Inteligência Artificial.
            </p>
            <div className={styles.jobForm}>
                <h3>Informações da Vaga:</h3>
                <div className={styles.inputContainer}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">
                            <PiChatCenteredDotsBold /> Título da Vaga:
                        </label>
                        <input
                            type="text"
                            placeholder="Título da vaga"
                            name="title"
                            id="title"
                            value={job.title}
                            onChange={handleJobChange}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="description">
                            <MdOutlineSubtitles /> Descrição da Vaga:
                        </label>
                        <textarea
                            placeholder="Descrição da vaga"
                            value={job.description}
                            name="description"
                            id="description"
                            onChange={handleJobChange}
                            style={{
                                height: "140px",
                                resize: "vertical",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.cvForms}>
                {cvFiles.map((cv, index) => (
                    <FormCard key={index}>
                        <h3>Candidato {index + 1}</h3>
                        <p style={{ marginBottom: "1rem" }}>
                            Anexe o currículo do candidato no formato PDF:
                        </p>
                        <div className={styles.inputContainer}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="file-input">
                                    <FaRegFileAlt />
                                    Currículo do Candidato:
                                </label>
                                <input
                                    type="file"
                                    name="file-input"
                                    onChange={(event) =>
                                        handleFileChange(event, index)
                                    }
                                    className={styles.fileInput}
                                    ref={(el) =>
                                        (fileInputRefs.current[index] = el)
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
                addButtonText={"+ Candidato"}
            />
            {error && <p className={styles.error}>Erro: {error}</p>}
            {analysis && <MarkdownComponent>{analysis}</MarkdownComponent>}
        </main>
    );
}
