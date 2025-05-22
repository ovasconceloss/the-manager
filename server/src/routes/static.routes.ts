import { FastifyInstance } from "fastify";
import StaticController from "../controllers/static.controller";


export default async function staticRoutes(fastify: FastifyInstance) {
  fastify.get("/static/club/all/:nation", StaticController.getClubsByNation);
  fastify.post("/static/manager/create", StaticController.createSaveDatabase);
}