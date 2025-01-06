"use client";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLocationOn } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { RiRemoteControlLine } from "react-icons/ri";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { MdFormatListNumbered } from "react-icons/md";

import { useState } from "react";
import Link from "next/link";
import styles from "./jobs.module.css"; // Import CSS Module

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
        console.log(formData);
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
        <div className={styles.jobs}>
            <h1 className={styles.title}>Busca de Vagas</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="searchTerm">
                        <div className={styles.icon}>
                            <IoMdSearch />
                        </div>
                        Termo de Busca
                    </label>
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
                            <option value="vagas">Vagas</option>
                            <option value="glassdoor">Glassdoor</option>
                            <option value="google">Google</option>
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
                    <label>
                        <input
                            type="radio"
                            name="jobType"
                            value="fulltime"
                            checked={formData.jobType === "fulltime"}
                            onChange={handleChange}
                        />
                        Tempo Integral
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobType"
                            value="parttime"
                            checked={formData.jobType === "parttime"}
                            onChange={handleChange}
                        />
                        Meio Período
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobType"
                            value="internship"
                            checked={formData.jobType === "internship"}
                            onChange={handleChange}
                        />
                        Estágio
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="jobType"
                            value="contract"
                            checked={formData.jobType === "contract"}
                            onChange={handleChange}
                        />
                        Contrato
                    </label>
                </div>

                <div className={styles.multiColumn}>
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={loading}
                    >
                        {loading ? "Buscando..." : "Buscar Vagas"}
                    </button>
                </div>
            </form>

            {error && <p className={styles.error}>Erro: {error}</p>}

            <div className={styles.results}>
                {jobs.map((job, index) => (
                    <div key={index} className={styles.jobCard}>
                        <h2>{job.title}</h2>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.job_type}</p>
                        <p>{job.date_posted}</p>
                        <Link
                            href={job.job_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Ver vaga
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
