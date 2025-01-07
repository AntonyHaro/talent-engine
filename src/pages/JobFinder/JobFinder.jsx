import { IoMdSearch } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdFormatListNumbered } from "react-icons/md";
import { MdSaveAlt } from "react-icons/md";

import { useState } from "react";
import styles from "./JobFinder.module.css";

export default function Page() {
    const [formData, setFormData] = useState({
        searchTerm: "",
        location: "",
        siteName: "indeed",
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
        e.preventDefault();
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
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            console.log(updatedFavoriteJobs);
            return;
        }

        // Adiciona o job aos favoritos
        const updatedFavoriteJobs = [...favoriteJobs, job];

        localStorage.setItem(
            "favoriteJobs",
            JSON.stringify(updatedFavoriteJobs)
        );
        console.log(updatedFavoriteJobs);
    };

    return (
        <main className={styles.jobs}>
            <h1 className={styles.title}>Buscador de Vagas</h1>
            <p style={{ color: "gray", marginBottom: "3%" }}>
                Selecione os filtros que deseja para buscar vagas com parâmetros
                personalizados.
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="searchTerm">
                        <div className={styles.icon}>
                            <IoMdSearch />
                        </div>
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
                        <div className={styles.icon}>
                            <MdOutlineLocationOn />
                        </div>
                        Localização
                    </label>
                    <div className={styles.multiColumn}>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            placeholder="Localização:"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="isRemote" className={styles.isRemote}>
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
                </div>

                <div className={styles.multiColumn}>
                    <div className={styles.formGroup}>
                        <label htmlFor="siteName">
                            <div className={styles.icon}>
                                <CgWebsite />
                            </div>
                            Site
                        </label>
                        <select
                            id="siteName"
                            name="siteName"
                            value={formData.siteName}
                            onChange={handleChange}
                        >
                            <option value="indeed">Indeed</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="glassdoor">Glassdoor</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="resultsWanted">
                            <div className={styles.icon}>
                                <MdFormatListNumbered />
                            </div>
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

                <div className={styles.formGroup}>
                    <label>
                        <div className={styles.icon}>
                            <LuBriefcaseBusiness />
                        </div>
                        Tipo de Trabalho
                    </label>
                    <div className={styles.multiColumn}>
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
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar Vagas!"}
                </button>
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            <div className={styles.results}>
                {jobs.map((job, index) => (
                    <div key={index} className={styles.jobCard}>
                        <h2>{job.title}</h2>
                        <div className={styles.jobInfo}>
                            <p>
                                <strong>Empresa: </strong> {job.company}
                            </p>
                            <p>
                                <strong>Localidade: </strong>s
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
                            <a
                                href={job.job_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ver vaga
                            </a>
                            <button onClick={() => handleSave(job)}>
                                <MdSaveAlt /> Salvar vaga
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
