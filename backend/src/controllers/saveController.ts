import fs from "fs";
import path from "path";
import SaveSystem from "../core/database/save";
import SessionSystem from "../core/session/session";
import { FastifyReply, FastifyRequest } from "fastify";

class SaveController {
    static async list(request: FastifyRequest, reply: FastifyReply) {
        const savesDirectory = SaveSystem.getSaveDirectory();

        try {
            const saveFiles = fs.readdirSync(savesDirectory).filter(file => file.endsWith(".tm"));
            return reply.status(200).send({ saves: saveFiles });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to list saves." });
        }
    }

    static async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            SessionSystem.newGame();
            return reply.status(201).send({ message: "New save created successfully." });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failed to create a new save." });
        }
    }

    static async load(request: FastifyRequest<{ Body: { filename: string } }>, reply: FastifyReply) {
        const { filename } = request.body;

        if (!filename || typeof filename !== "string")
            return reply.status(400).send({ error: "Name of save is mandatory." });

        try {
            SessionSystem.loadGame(filename);
            return reply.status(200).send({ message: `Save ${filename} loaded.` });
        } catch (err) {
            return reply.status(500).send({ error: err, message: "Failure to load save." });
        }
    }

    static async delete(request: FastifyRequest<{ Params: { filename: string } }>, reply: FastifyReply) {
        const { filename } = request.params;

        const savesDirectory = SaveSystem.getSaveDirectory();
        const filePath = path.join(savesDirectory, filename);

        if (!filename.endsWith(".tm"))
            return reply.status(400).send({ message: "Failed to delete save: Invalid file." });

        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return reply.status(200).send({ message: "Save successfully deleted." });
            }
        } catch (err) {
            return reply.status(500).send({ error: err, messaga: "Save deletion failed." });
        }
    }
}

export default SaveController;