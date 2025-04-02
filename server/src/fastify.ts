import Fastify from "fastify";
import cors from "@fastify/cors";
import staticRoutes from "./routes/static.routes";

const fastify = Fastify();

fastify.register(cors, {
    origin: ["*", "http://localhost:1420", "tauri://localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});

fastify.register(staticRoutes);

export default fastify;