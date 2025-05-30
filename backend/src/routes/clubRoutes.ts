import { FastifyInstance } from "fastify";
import ClubController from "../controllers/clubController";

export default async function clubRoutes(fastify: FastifyInstance) {
    fastify.get("/club/:clubId", ClubController.getClubById);
    fastify.get("/club/:leagueId", ClubController.getClubByLeague);
}