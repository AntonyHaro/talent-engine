import { useState } from "react";
import ReturnHome from "../../components/return-home/ReturnHome";
import SubmitButton from "../../components/submit-button/SubmitButton";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { MdFormatListNumbered } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import styles from "./Jobs.module.css";

function JobCard({ job }) {
    const [saved, setSaved] = useState(false);

    const handleSave = (job) => {
        if (!job || typeof job !== "object") {
            console.error("O argumento precisa ser um objeto válido.");
            return;
        }

        const favoriteJobs =
            JSON.parse(localStorage.getItem("favoriteJobs")) || [];

        // Verifica se o job já está nos favoritos
        const isAlreadyFavorite = favoriteJobs.some((fav) => fav.id === job.id);

        if (isAlreadyFavorite) {
            // Remove o job dos favoritos
            const updatedFavoriteJobs = favoriteJobs.filter(
                (fav) => fav.id !== job.id
            );

            localStorage.setItem(
                "favoriteJobs",
                JSON.stringify(updatedFavoriteJobs)
            );

            setSaved(false);
            console.log(updatedFavoriteJobs);
            return;
        }

        // Adiciona o job aos favoritos
        const updatedFavoriteJobs = [...favoriteJobs, job];

        localStorage.setItem(
            "favoriteJobs",
            JSON.stringify(updatedFavoriteJobs)
        );

        setSaved(true);
        console.log(updatedFavoriteJobs);
    };

    return (
        <div className={styles.jobCard}>
            <h2>{job.title}</h2>
            <div className={styles.jobInfo}>
                <p>
                    <strong>Empresa: </strong> {job.company}
                </p>
                <p>
                    <strong>Localidade: </strong>
                    {job.location || "Não informada"}
                </p>
                <p>
                    <strong>Tipo de trabalho: </strong>
                    {job.job_type || "Não informado"}
                </p>
                <p>
                    <strong>Data postada: </strong>
                    {job.date_posted || "Não informada"}
                </p>
            </div>
            <div className={styles.flexContainer}>
                <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                    Ver vaga
                </a>
                <button onClick={() => handleSave(job)}>
                    {saved ? (
                        <>
                            <FaStar /> Vaga salva
                        </>
                    ) : (
                        <>
                            <FaRegStar /> Salvar vaga
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default function Jobs() {
    const [formData, setFormData] = useState({
        searchTerm: "",
        location: "",
        siteName: "linkedin",
        resultsWanted: 20,
        isRemote: false,
        jobType: "fulltime",
    });
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    search_term: formData.searchTerm,
                    location: formData.location,
                    site_name: [formData.siteName],
                    results_wanted: formData.resultsWanted,
                    is_remote: formData.isRemote,
                    job_type: formData.jobType,
                    use_tor: true,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao buscar vagas");
            }

            const data = await response.json();
            setJobs(data.jobs);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className={styles.jobs}>
            <ReturnHome />
            <h1 className={styles.title}>💼 Buscador de Vagas</h1>
            <p className="info">
                Selecione os filtros que deseja para buscar vagas com parâmetros
                personalizados.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.multiColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="searchTerm">
                            <IoMdSearch />
                            Palavras-chave
                        </label>
                        <input
                            type="text"
                            id="searchTerm"
                            name="searchTerm"
                            value={formData.searchTerm}
                            placeholder="Palavras-chave:"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="location">
                            <MdOutlineLocationOn />
                            Localização
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            placeholder="Localização:"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className={styles.multiColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="siteName">
                            <CgWebsite />
                            Site
                        </label>
                        <select
                            id="siteName"
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                        >
                            <option value="linkedin">LinkedIn</option>
                            <option value="glassdoor">Glassdoor</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="resultsWanted">
                            <MdFormatListNumbered />
                            Quantidade de Resultados
                        </label>
                        <input
                            type="number"
                            id="resultsWanted"
                            name="resultsWanted"
                            value={formData.resultsWanted}
                            onChange={handleChange}
                            min="1"
                        />
                    </div>
                </div>

                <div className={styles.jobTypeContainer}>
                    {["fulltime", "parttime", "internship", "contract"].map(
                        (type) => (
                            <label
                                key={type}
                                className={`${styles.jobType} ${
                                    formData.jobType === type
                                        ? styles.selected
                                        : ""
                                }`}
                            >
                                {type === "fulltime" && "Tempo Integral"}
                                {type === "parttime" && "Meio Período"}
                                {type === "internship" && "Estágio"}
                                {type === "contract" && "Contrato"}
                                <input
                                    type="radio"
                                    name="jobType"
                                    value={type}
                                    checked={formData.jobType === type}
                                    onChange={handleChange}
                                />
                            </label>
                        )
                    )}
                    <label
                        htmlFor="isRemote"
                        className={`${styles.isRemote} ${styles.jobType}`}
                    >
                        Trabalho Remoto?
                        <input
                            type="checkbox"
                            id="isRemote"
                            name="isRemote"
                            checked={formData.isRemote}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </form>
            <SubmitButton
                text={"Buscar Vagas!"}
                loadingMessage={"Buscando..."}
                loading={loading}
                width={"50%"}
                onClick={handleSubmit}
            />
            {error && <p className={styles.error}>Erro: {error}</p>}
            <div className={styles.results}>
                <h2>Resultados Encontrados:</h2>
                {jobs.length <= 0 ? (
                    <p style={{ color: "gray" }}>
                        Nenhum resultado disponível...
                    </p>
                ) : (
                    <div className={styles.jobsContainer}>
                        {jobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
