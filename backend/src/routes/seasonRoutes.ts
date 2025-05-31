import { FastifyInstance } from "fastify";
import SeasonController from "../controllers/seasonController";

export default async function seasonRoutes(fastify: FastifyInstance) {
    fastify.post("/season/start", SeasonController.createSeason);
    fastify.post("/season/advance-day", SeasonController.advanceDay);
    fastify.get("/season/current", SeasonController.getCurrentSeason);
}