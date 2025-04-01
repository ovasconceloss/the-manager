import Fastify from "fastify";
import staticRoutes from "./routes/static.routes";

const fastify = Fastify();

fastify.register(staticRoutes);

export default fastify;