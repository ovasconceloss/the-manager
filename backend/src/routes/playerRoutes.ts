import { FastifyInstance } from "fastify";
import PlayerController from "../controllers/playerController";

export default async function playerRoutes(fastify: FastifyInstance) {
    fastify.get("/player/:playerId", PlayerController.getPlayerById);
    fastify.get("/player/club/:clubId", PlayerController.getPlayerByClub);
    fastify.get("/player/name/:playerName", PlayerController.getPlayerByName);
}