import fastify from "./fastify";

const startServer = async () => {
    try {
        await fastify.listen({ port: 8080 });
        fastify.log.info(`Server running on port 8080`);
    } catch (err) {
        console.error('Failed to initialize the server:', err);
        fastify.log.error(`Failed to initialize the server: `, err);
        process.exit(1);
    }
}

process.on('unhandledRejection', (reason) => {
    console.error("Unhandled Rejection:", reason);
    process.exit(1);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

startServer();