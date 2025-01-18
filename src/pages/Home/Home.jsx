import { Link } from "react-router-dom";
import { LuGlasses } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import styles from "./Home.module.css";

function Feature({ name, description, icon }) {
    return (
        <Link className={styles.feature}>
            <h2>
                {icon} {name}
            </h2>
            <p>{description}</p>
        </Link>
    );
}

export default function Home() {
    return (
        <main className={styles.home}>
            <h1>Painel Principal - TalentAI</h1>
            <p className={styles.info}>
                Navegue pelas ferramentas inovadoras que criamos para
                simplificar sua transição de carreira. De buscas inteligentes a
                análises detalhadas, tudo está aqui para impulsionar o seu
                sucesso!
            </p>
            <div className={styles.featureContainer}>
                <Feature
                    name="Buscador de Vagas"
                    description="Encontre vagas ideais com filtros como localização, área e palavras-chave, acessando múltiplas plataformas para resultados personalizados e relevantes."
                    icon={"💼"}
                />
                <Feature
                    name="Analisador de Currículos"
                    description="Avalie seu currículo com IA, comparando-o a vagas para obter insights sobre compatibilidade e sugestões de melhorias."
                    icon={"👤"}
                />
                <Feature
                    name="Gerador de Perfil Ideal para Vagas"
                    description="Crie perfis otimizados para se destacar em vagas específicas, com recomendações personalizadas de habilidades e competências."
                    icon={"😎"}
                />
                <Feature
                    name="Busca de Cargos e Faixa Salarial"
                    description="Pesquise cargos e descubra faixas salariais atualizadas para entender o mercado e planejar sua carreira."
                    icon={"📊"}
                />
                <Feature
                    name="Gerador de Profile no LinkedIn"
                    description="Monte um perfil atraente no LinkedIn, destacando suas habilidades e experiências para impressionar recrutadores."
                    icon={"👨‍💻"}
                />
                <Feature
                    name="Orientador de Carreiras"
                    description="Receba orientação personalizada de carreira com insights baseados em tendências de mercado e suas metas profissionais."
                    icon={"🦾"}
                />
                <Feature
                    name="Match de Cultura Organizacional"
                    description="Avalie a compatibilidade com a cultura das empresas, alinhando valores e estilo de trabalho. Aumente suas chances de sucesso ao encontrar o ambiente ideal para você."
                    icon={"🏢"} // Icone representando empresas e cultura organizacional
                />
                <Feature
                    name="Comparador de Vagas"
                    description="Compare diferentes oportunidades de emprego lado a lado, considerando salário, benefícios, crescimento e outros fatores essenciais para sua escolha."
                    icon={"⚖️"} // Icone representando equilíbrio ou comparação
                />
                <Feature
                    name="Checar Reputações de Empresas"
                    description="Pesquise e analise a reputação de empresas com base em avaliações de funcionários e ex-funcionários. Tome decisões informadas sobre onde você quer trabalhar."
                    icon={"⭐"} // Ícone de estrela, simbolizando avaliações e reputações
                />
            </div>
        </main>
    );
}
