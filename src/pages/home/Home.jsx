import { useState } from "react";
import { Link } from "react-router-dom";
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

function Feature({ name, description, icon, link }) {
    return (
        <Link className={styles.feature} to={link}>
            <h2>
                {icon} {name}
            </h2>
            <p>{description}</p>
        </Link>
    );
}

export default function Home() {
    const [selectedFilter, setSelectedFilter] = useState("Tudo");

    const features = [
        {
            name: "Explorador de Vagas e Mercado",
            description:
                "Encontre Exploração de Vagas e Mercado ideais com filtros como localização, área e palavras-chave, acessando múltiplas plataformas para resultados personalizados e relevantes.",
            icon: "💼",
            link: "/jobs",
            category: "Exploração de Vagas e Mercado",
        },
        {
            name: "Comparador de Vagas",
            description:
                "Compare diferentes oportunidades de emprego lado a lado, considerando salário, benefícios, crescimento e outros fatores essenciais para sua escolha.",
            icon: "⚖️",
            link: "/job-comparator",
            category: "Exploração de Vagas e Mercado",
        },
        {
            name: "Analisador de Currículos Profissionais",
            description:
                "Avalie seu Currículo Profissional com IA, comparando-o a Exploração de Vagas e Mercado para obter insights sobre compatibilidade e sugestões de melhorias.",
            icon: "👤",
            link: "/cv-analyzer",
            category: "Personalização de Perfil Profissional",
        },
        {
            name: "Gerador de Perfil Ideal para Vagas e Mercado",
            description:
                "Crie perfis otimizados para se destacar em Exploração de Vagas e Mercado específicas, com recomendações personalizadas de habilidades e competências.",
            icon: "😎",
            link: "best-profile",
            category: "Personalização de Perfil Profissional",
        },
        {
            name: "Busca de Cargos e Faixa Salarial",
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
            name: "Match de Cultura Organizacional",
            description:
                "Avalie a compatibilidade com a cultura das empresas, alinhando valores e estilo de trabalho. Aumente suas chances de sucesso ao encontrar o ambiente ideal para você.",
            icon: "🏢",
            category: "Orientação e Planejamento de Carreira",
        },
        {
            name: "Checar Reputações de Empresas",
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

    return (
        <main className={styles.home}>
            <h1 className={styles.title}>Painel Principal - TalentAI</h1>
            <p className={styles.info}>
                Navegue pelas ferramentas inovadoras que criamos para
                simplificar sua transição de carreira. De buscas inteligentes a
                análises detalhadas, tudo está aqui para impulsionar o seu
                sucesso!
            </p>
            <Filters
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
            />
            <div className={styles.featureContainer}>
                {filteredFeatures.map((feature) => (
                    <Feature
                        key={feature.name}
                        name={feature.name}
                        description={feature.description}
                        icon={feature.icon}
                        link={feature.link || "#"}
                    />
                ))}
            </div>
        </main>
    );
}
