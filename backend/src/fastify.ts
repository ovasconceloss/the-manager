import Fastify from "fastify";
import { errorHandlerPlugin } from "./plugins/error-handler";

const fastify = Fastify({ logger: true });

errorHandlerPlugin(fastify);

export default fastify;