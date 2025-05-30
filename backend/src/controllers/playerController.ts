import { FastifyReply, FastifyRequest } from "fastify";
import PlayerService from "../services/playerService";

class PlayerController {
    static async getPlayerById(request: FastifyRequest<{ Params: { playerId: number } }>, reply: FastifyReply) {
        const playerId = request.params.playerId;

        try {
            const player = await PlayerService.fetchPlayerById(playerId);
            return reply.status(200).send({ player: player });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from player" });
        }
    }

    static async getPlayerByName(request: FastifyRequest<{ Params: { playerName: string } }>, reply: FastifyReply) {
        const playerName = request.params.playerName;

        try {
            const player = await PlayerService.fetchPlayerByName(playerName);
            return reply.status(200).send({ player: player });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from player" });
        }
    }

    static async getPlayerByClub(request: FastifyRequest<{ Params: { playerName: string } }>, reply: FastifyReply) {
        const playerName = request.params.playerName;

        try {
            const player = await PlayerService.fetchPlayerByName(playerName);
            return reply.status(200).send({ player: player });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to retrieve data from player" });
        }
    }
}

export default PlayerController;