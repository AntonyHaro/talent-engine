import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            // Rota de proxy
            "/api": {
                target: "http://127.0.0.1:5000", // URL da API Flask
                // target: "http://dev.diggilabs.diggisys:5000", // URL da API Flask
                changeOrigin: true, // Ajusta o cabeçalho "origin" para corresponder ao destino
                rewrite: (path) => path.replace(/^\/api/, ""), // Remove o prefixo "/api" ao encaminhar a solicitação
            },
        },
    },
});
