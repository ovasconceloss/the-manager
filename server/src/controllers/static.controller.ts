import { FastifyReply, FastifyRequest } from "fastify";
import StaticService from "../services/static.service";

const StaticController = {
    async getClubsByNation(request: FastifyRequest<{ Params: { nation: string } }>, reply: FastifyReply) {
        try {
            const clubsByNation = await StaticService.fetchClubsByNation(request.params.nation);
            return reply.status(200).send(clubsByNation);
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Failed to retrieve data" });
        }
    }
}

export default StaticController;