import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5000",
                // target: "http://dev.diggilabs.diggisys:5000", // URL da API Flask
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
        port: 3000,
    },
});
