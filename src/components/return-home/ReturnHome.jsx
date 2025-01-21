import { Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function ReturnHome() {
    return (
        <Link
            to={"/"}
            style={{
                color: "gray",
                width: "fit-content",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
            }}
        >
            <IoArrowBack /> Voltar ao painel principal
        </Link>
    );
}
