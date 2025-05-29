import SeasonService from "../services/seasonService";
import { FastifyReply, FastifyRequest } from "fastify";

class SeasonController {
    static getCurrentSeason(request: FastifyRequest, reply: FastifyReply) {
        try {
            const seasonInformation = SeasonService.insertSeason();
            return reply.status(201).send({ seasonInformation });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data for the current season" });
        }
    }

    static createSeason(request: FastifyRequest, reply: FastifyReply) {
        try {
            SeasonService.insertSeason();
            return reply.status(201).send({ message: "New season successfully started." });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to insert the new season." });
        }
    }
}

export default SeasonController;