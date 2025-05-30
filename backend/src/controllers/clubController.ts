import { FastifyReply, FastifyRequest } from "fastify";
import ClubService from "../services/clubService";

class ClubController {
    static async getClubById(request: FastifyRequest<{ Params: { clubId: number } }>, reply: FastifyReply) {
        const clubId = request.params.clubId;

        try {
            const club = await ClubService.fetchClubById(clubId);
            return reply.status(200).send({ club: club });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from club by ID" });
        }
    }

    static async getClubByLeague(request: FastifyRequest<{ Params: { leagueId: number } }>, reply: FastifyReply) {
        const leagueId = request.params.leagueId;

        try {
            const club = await ClubService.fetchClubByLeague(leagueId);
            return reply.status(200).send({ club: club });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from club by league ID" });
        }
    }
}

export default ClubController;