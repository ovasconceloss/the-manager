import { FastifyInstance } from "fastify";
import LeagueController from "../controllers/leagueController";

export default async function leagueRoutes(fastify: FastifyInstance) {
    fastify.get("/league/all", LeagueController.getAllLeagues);
    fastify.get("/league/:leagueId", LeagueController.getLeagueById);
}