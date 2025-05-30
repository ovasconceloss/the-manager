import LeagueService from "../services/leagueService";
import { FastifyReply, FastifyRequest } from "fastify";

class LeagueController {
    static async getAllLeagues(request: FastifyRequest, reply: FastifyReply) {
        try {
            const leagues = await LeagueService.fetchAllLeagues();
            return reply.status(200).send({ leagues: leagues });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from all leagues" });
        }
    }

    static async getLeagueById(request: FastifyRequest<{ Params: { leagueId: number } }>, reply: FastifyReply) {
        const leagueId = request.params.leagueId;

        try {
            const league = await LeagueService.fetchLeagueById(leagueId);
            return reply.status(200).send({ league: league });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from league by ID" });
        }
    }
}

export default LeagueController;