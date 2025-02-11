import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

function JobCard({ job }) {
    return (
        <div className={styles.jobCard}>
            <h2>{job.title} </h2>

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
            <div className={styles.jobActions}>
                <a href={job.job_url} target="_blank" rel="noopener noreferrer">
                    Ver vaga
                </a>
            </div>
        </div>
    );
}

function Profile() {
    const [savedJobs, setSavedJobs] = useState([]);
    const [deletedJobs, setDeletedJobs] = useState([]);

    useEffect(() => {
        const storedFavoriteJobs = localStorage.getItem("favoriteJobs");
        const storedDeletedJobs = localStorage.getItem("deletedJobs");

        if (storedFavoriteJobs) {
            setSavedJobs(JSON.parse(storedFavoriteJobs));
        }
        if (storedDeletedJobs) {
            setDeletedJobs(JSON.parse(storedDeletedJobs));
        }
    }, []);

    return (
        <main className={styles.profile}>
            <h1>Bem vindo ao seu perfil, Usuário Padrão!</h1>
            <p className="info">
                Aqui você pode ver informações, relevantes e estatísticas do seu
                perfil.
            </p>
            <div className={styles.results}>
                <h2>Vagas Salvas:</h2>
                {savedJobs.length <= 0 ? (
                    <p style={{ color: "gray" }}>
                        Nenhum resultado disponível...
                    </p>
                ) : (
                    <div className={styles.jobsContainer}>
                        {savedJobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.results}>
                <h2>Vagas Excluídas:</h2>
                {deletedJobs.length <= 0 ? (
                    <p style={{ color: "gray" }}>
                        Nenhum resultado disponível...
                    </p>
                ) : (
                    <div className={styles.jobsContainer}>
                        {deletedJobs.map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default Profile;
