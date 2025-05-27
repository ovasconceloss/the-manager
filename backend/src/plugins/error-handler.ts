import { BaseError } from "../errors/BaseError";
import { FastifyInstance, FastifyError, FastifyReply, FastifyRequest } from "fastify";

export function errorHandlerPlugin(fastify: FastifyInstance) {
    fastify.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
        const statusCode = error instanceof BaseError ? error.statusCode : 500;
        const message = error instanceof BaseError ? error.message : "Internal Server Error";

        fastify.log.error(error);

        reply.status(statusCode).send({ error: message });
    });
}