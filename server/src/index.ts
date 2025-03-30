import fastify from "./fastify";
import DatabaseSystem from "./config/database";

const startServer = () => {
    try {
        fastify.listen({ port: 3000 }, (error, address) => {
            if (error) console.error(error);

            console.log(`Running at ${address}`);
        });

        DatabaseSystem.connectDatabase("load", "save_2025-03-30-652.tm");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();