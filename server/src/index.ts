import fastify from "./fastify";
import DatabaseSystem from "./config/database";
import GameImagesGraphics from "./config/graphics";

const startServer = () => {
  try {
    fastify.listen({ port: 3000 }, (error, address) => {
      if (error) console.error(error);

      console.log(`Running at ${address}`);
    });

    const { database, isNew } = DatabaseSystem.connectDatabase("create");
    if (isNew) GameImagesGraphics.insertImagesAutomatically(database);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();