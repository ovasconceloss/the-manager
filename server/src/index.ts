import fastify from "./fastify";
import connectDatabase from "./config/database";

const startServer = () => {
    try {
        fastify.listen({ port: 3000 }, (error, address) => {
            if (error) console.error(error);

            console.log(`Running at ${address}`);
        });

        connectDatabase();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();