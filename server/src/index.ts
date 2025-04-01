import fastify from "./fastify";
import GameImagesGraphics from "./config/graphics";
import StaticDatabase from "./config/staticDatabase";

const initializeStaticDatabase = async () => {
  try {
    const staticDatabaseExist = await StaticDatabase.checkStaticDatabaseExists();

    if (!staticDatabaseExist) {
      const staticDatabase = StaticDatabase.createStaticDatabase();
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

    await initializeStaticDatabase();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();