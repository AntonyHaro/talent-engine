"use client";

import { useState } from "react";
import styles from "./jobs.module.css"; // Import CSS Module

export default function Page() {
    const [formData, setFormData] = useState({
        searchTerm: "",
        location: "",
        siteName: "indeed",
        resultsWanted: 20,
    });
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Busca de Vagas</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="searchTerm">Termo de Busca</label>
                    <input
                        type="text"
                        id="searchTerm"
                        name="searchTerm"
                        value={formData.searchTerm}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="location">Localização</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="siteName">Site</label>
                    <select
                        id="siteName"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleChange}
                    >
                        <option value="indeed">Indeed</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="vagas">Vagas</option>
                        <option value="glassdoor">Glassdoor</option>
                        <option value="google">Google</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="resultsWanted">
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

                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? "Buscando..." : "Buscar Vagas"}
                </button>
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            <div className={styles.results}>
                {jobs.map((job, index) => (
                    <div key={index} className={styles.jobCard}>
                        <h2>{job.title}</h2>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <a
                            href={job.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver Detalhes
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
