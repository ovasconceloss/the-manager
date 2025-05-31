import SeasonService from "../services/seasonService";
import { FastifyReply, FastifyRequest } from "fastify";

class SeasonController {
    static async getCurrentSeason(request: FastifyRequest, reply: FastifyReply) {
        try {
            const seasonInformation = await SeasonService.fetchCurrentSeason();
            return reply.status(201).send({ seasonInformation });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data for the current season" });
        }
    }

    static async createSeason(request: FastifyRequest, reply: FastifyReply) {
        try {
            SeasonService.insertSeason();
            return reply.status(201).send({ message: "New season successfully started." });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to insert the new season." });
        }
    }

    static async advanceDay(request: FastifyRequest, reply: FastifyReply) {
        try {
            SeasonService.advanceDay();
            return reply.status(201).send({ message: "Day successfully completed" });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failure to advance the day" });
        }
    }
}

export default SeasonController;