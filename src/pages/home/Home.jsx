import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { IoClose } from "react-icons/io5";

import styles from "./Home.module.css";

function Filters({ selectedFilter, onFilterChange }) {
    const filters = [
        "Tudo",
        "Exploração de Vagas e Mercado",
        "Personalização de Perfil Profissional",
        "Orientação e Planejamento de Carreira",
    ];

    return (
        <ul className={styles.filterContainer}>
            {filters.map((filter) => (
                <li
                    key={filter}
                    className={`${styles.filterItem} ${
                        selectedFilter === filter ? styles.activeFilter : ""
                    }`}
                    onClick={() => onFilterChange(filter)}
                >
                    {filter}
                </li>
            ))}
        </ul>
    );
}

function RecentActivity() {
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const storedActivity =
            JSON.parse(localStorage.getItem("recentActivity")) || [];
        setRecentActivity(storedActivity);
    }, []);

    const handleDelete = (activity) => {
        const updatedActivity = recentActivity.filter(
            (act) => act.name !== activity.name
        );
        setRecentActivity(updatedActivity);
        localStorage.setItem("recentActivity", JSON.stringify(updatedActivity));
    };

    return (
        <ul className={styles.recentActivity}>
            <p style={{ color: "gray", paddingRight: "0.6rem" }}>
                Atividades recentes:
            </p>
            {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                    <div className={styles.activity}>
                        <Link to={activity.link} key={index}>
                            {activity.name}
                        </Link>
                        <IoClose onClick={() => handleDelete(activity)} />
                    </div>
                ))
            ) : (
                <p style={{ color: "gray", fontWeight: "bold" }}>
                    Nenhuma atividade recente no momento...
                </p>
            )}
        </ul>
    );
}
export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState("Tudo");

    const features = [
        {
            name: "Explorador de Vagas",
            description:
                "Encontre vagas com filtros personalizados, acessando as melhores plataformas para resultados relevantes.",
            icon: "💼",
            link: "/jobs",
            category: "Exploração de Vagas e Mercado",
        },
        {
            name: "Analisador de Currículos",
            description:
                "Analisador de Currículos com IA, analisando currículos com uma vaga de referência para obter insights sobre compatibilidade e sugestões de melhorias.",
            icon: "👤",
            link: "/cv-analyzer",
            category: "Personalização de Perfil Profissional",
        },
        {
            name: "Gerador de Perfil Ideal",
            description:
                "Gerador de perfis otimizados para se destacar em vagas específicas, com recomendações personalizadas de habilidades e competências.",
            icon: "😎",
            link: "/best-profile",
            category: "Personalização de Perfil Profissional",
        },
        {
            name: "Cargos e Faixa Salarial",
            description:
                "Pesquise cargos e descubra faixas salariais atualizadas para entender o mercado e planejar sua carreira.",
            icon: "📊",
            category: "Exploração de Vagas e Mercado",
        },
        {
            name: "Gerador de Profile no LinkedIn",
            description:
                "Monte um perfil atraente no LinkedIn, destacando suas habilidades e experiências para impressionar recrutadores.",
            icon: "👨‍💻",
            category: "Personalização de Perfil Profissional",
        },
        {
            name: "Orientador de Carreiras",
            description:
                "Receba orientação personalizada de carreira com insights baseados em tendências de mercado e suas metas profissionais.",
            icon: "🦾",
            category: "Orientação e Planejamento de Carreira",
        },
        {
            name: "Match de Cultura Corporativa",
            description:
                "Avalie a compatibilidade com a cultura das empresas, alinhando valores e estilo de trabalho. Aumente suas chances de sucesso ao encontrar o ambiente ideal para você.",
            icon: "🏢",
            category: "Orientação e Planejamento de Carreira",
        },
        {
            name: "Reputações de Empresas",
            description:
                "Pesquise e analise a reputação de empresas com base em avaliações de funcionários e ex-funcionários. Tome decisões informadas sobre onde você quer trabalhar.",
            icon: "⭐",
            category: "Orientação e Planejamento de Carreira",
        },
    ];

    const filteredFeatures = features.filter(
        (feature) =>
            selectedFilter === "Tudo" || feature.category === selectedFilter
    );

    const handleHistory = (feature) => {
        if (!feature || typeof feature !== "object") {
            console.error("A feature precisa ser um objeto válido.");
            return;
        }

        let recentActivity =
            JSON.parse(localStorage.getItem("recentActivity")) || [];

        // Remover a atividade se já existir no histórico
        recentActivity = recentActivity.filter((f) => f.name !== feature.name);

        // Adicionar a atividade no início da lista
        recentActivity.unshift(feature);

        // Manter apenas os últimos 5 itens
        if (recentActivity.length > 6) {
            recentActivity.pop(); // Remove o último item (mais antigo)
        }

        localStorage.setItem("recentActivity", JSON.stringify(recentActivity));
    };

    return (
        <>
            {/* <button className={styles.menuButton}>*</button> */}
            <main className={styles.home}>
                <h1 className={styles.title}>
                    Painel Principal -{" "}
                    <span style={{ color: "darkgray" }}>
                        Talent<span style={{ color: "darkgray" }}>AI</span>
                    </span>
                </h1>
                <p className={styles.info}>
                    Navegue pelas ferramentas inovadoras que criamos para
                    simplificar sua transição de carreira. De buscas
                    inteligentes a análises detalhadas, tudo está aqui para
                    impulsionar o seu sucesso!
                </p>
                <RecentActivity />
                <Filters
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                />
                <div className={styles.featureContainer}>
                    {filteredFeatures.map((feature, index) => (
                        <Link
                            key={index}
                            className={styles.feature}
                            to={feature.link}
                            onClick={() => handleHistory(feature)}
                        >
                            <h1>{feature.icon}</h1>
                            <h2>{feature.name}</h2>
                            <p>{feature.description}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    );
}
