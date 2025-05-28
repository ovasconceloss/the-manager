import Fastify from "fastify";
import cors from "@fastify/cors";
import saveRoutes from "./routes/saveRoutes";
import { errorHandlerPlugin } from "./plugins/error-handler";

const fastify = Fastify({ logger: true });

errorHandlerPlugin(fastify);

fastify.register(cors, {
    origin: ["*", "http://localhost:1420", "tauri://localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});

fastify.register(saveRoutes);

export default fastify;