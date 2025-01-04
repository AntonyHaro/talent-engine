/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*", // Qualquer requisição que comece com "/api"
                destination: "http://127.0.0.1:5000/:path*", // Redireciona para a API Flask na porta 5000
            },
        ];
    },
};

export default nextConfig;
