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
    },

    async createSaveDatabase(request: FastifyRequest<{ Body: { saveConfirm: boolean } }>, reply: FastifyReply) {
        try {
            if (request.body.saveConfirm) {
                return reply.status(201).send({ message: "Save database created" });
            }
        } catch (error) {
            console.error(error);
            return reply.status(500).send({ error: "Failed to create a new save" });
        }
    }
}

export default StaticController;