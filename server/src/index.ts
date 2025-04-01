import fastify from "./fastify";
import DatabaseSystem from "./config/database";
import GameImagesGraphics from "./config/graphics";

const initializeDatabase = async () => {
  try {
    const staticDatabaseExist = await DatabaseSystem.checkStaticDatabaseExists();

    if (!staticDatabaseExist) {
      const staticDatabase = DatabaseSystem.createStaticDatabase();
      await GameImagesGraphics.insertImagesAutomatically(staticDatabase);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

const startServer = async () => {
  try {
    fastify.listen({ port: 3000 }, (error, address) => {
      if (error) console.error(error);

      console.log(`Running at ${address}`);
    });

    await initializeDatabase();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();