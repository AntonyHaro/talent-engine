import { LuBriefcaseBusiness } from "react-icons/lu";
import { LuGlasses } from "react-icons/lu";
import styles from "./Home.module.css";

function FeatureCard({ feature, description, iconComponent }) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.svg}>{iconComponent}</div>
            <div className={styles.info}>
                <h2>{feature}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}

export default function Home() {
    return (
        <main className={styles.home}>
            <h1 className={styles.title}>Bem vindo ao Talent Engine!</h1>
            <p style={{ color: "gray" }}>
                Selecione as opções do cabeçalho para começar a usar nossa
                ferramenta.
            </p>
            <section className={styles.featureContainer}>
                <FeatureCard
                    feature="Job Finder"
                    description="Encontre as melhores oportunidades de emprego de forma prática e eficiente. Nosso buscador personalizado permite que você defina parâmetros específicos, como localização, área de atuação e palavras-chave. Além disso, realiza buscas em diversas plataformas de emprego, garantindo resultados abrangentes e relevantes para você."
                    iconComponent={<LuBriefcaseBusiness />}
                />
                <FeatureCard
                    feature="CV Analyzer"
                    description="Potencialize suas chances de sucesso com o analisador de currículos baseado em Inteligência Artificial. Compare seu currículo com a descrição de uma vaga e receba insights detalhados sobre o nível de compatibilidade. Obtenha sugestões valiosas para destacar suas habilidades e aumentar suas chances de contratação."
                    iconComponent={<LuGlasses />}
                />
            </section>
        </main>
    );
}
