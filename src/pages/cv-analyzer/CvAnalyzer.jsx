import { useState, useRef } from "react";
import axios from "axios";

import MarkdownComponent from "../../components/markdown-component/MarkdownComponent";
import ReturnHome from "../../components/return-home/ReturnHome";
import Actions from "../../components/actions/Actions";
import FormCard from "../../components/form-card/FormCard";

import { MdOutlinePersonOutline } from "react-icons/md";

import styles from "./CvAnalyzer.module.css";

export default function CvAnalyzer() {
    const [cvFiles, setCvFiles] = useState([{ file: null }]);
    const [job, setJob] = useState("");
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
            return
        }

        alert("É possível comparar até 4 candidatos!")
    };  

    const handleFileChange = (event, index) => {
        const newFiles = [...cvFiles];
        newFiles[index] = { file: event.target.files[0] };
        setCvFiles(newFiles);
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

        // formData.append("message", job);

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
            <p className="info">
                Adicione currículos e as informações da vaga para iniciar a
                análise com a Inteligência Artificial.
            </p>
            <div className={styles.cvForms}>
                {cvFiles.map((cv, index) => (
                    <FormCard key={index}>
                        <h3>
                            <MdOutlinePersonOutline /> Candidato {index + 1}
                        </h3>
                        <p style={{ marginBottom: "5%" }}>
                            Anexe o currículo do candidato no formato PDF:
                        </p>
                        <div className={styles.inputContainer}>
                            <div className={styles.input}>
                                <input
                                    type="text"
                                    placeholder="Nome do candidato:"
                                />
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="file"
                                    name={`file-input-${index}`}
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
