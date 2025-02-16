/** @type {import('next').NextConfig} */
const nextConfig = {async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization,x-api-key ",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Permitir solicitudes de cualquier origen
          },
        ],
      },
    ];
  }  }

module.exports = nextConfig


  
