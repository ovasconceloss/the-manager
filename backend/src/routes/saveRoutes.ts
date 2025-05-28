import { FastifyInstance } from "fastify";
import SaveController from "../controllers/saveController";

export default async function saveRoutes(fastify: FastifyInstance) {
    fastify.get('/save/list', SaveController.list);
    fastify.post('/save/create', SaveController.create);
    fastify.post('/save/load', SaveController.load);
    fastify.delete('/save/delete/:filename', SaveController.delete);
}