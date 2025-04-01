import os from "os";
import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import DatabaseSystem from "./database";

const GRAPHICS_FOLDER_PATH = path.join(os.homedir(), 'Documents', 'ProPlay Games', "The Manager 2025", "graphics", "logos");

class GameImagesGraphics {
  static processClubImages = async (
    folderPath: string,
    nationName: string,
    database: Database.Database
  ) => {
    const databaseInstance = DatabaseSystem.connectDatabase("load", database.name);

    const imageFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".png"));

    for (const file of imageFiles) {
      const clubId = parseInt(file.replace(".png", ""), 10);
      if (isNaN(clubId)) continue;

      const filePath = `graphics/logos/${nationName}/${file}`;
      const clubExists = databaseInstance.database
        .prepare("SELECT COUNT(*) as count FROM club WHERE id = ?")
        .get(clubId) as { count: number };

      if (clubExists.count > 0) {
        databaseInstance.database
          .prepare("UPDATE club SET image_logo = ? WHERE id = ?")
          .run(filePath, clubId);
      }
    }
  };

  static processNationType = async (
    folderPath: string,
    columnName: string,
    database: Database.Database
  ) => {
    const databaseInstance = DatabaseSystem.connectDatabase("load", database.name);

    const imageFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith(".png"));

    for (const file of imageFiles) {
      const nationId = parseInt(file.replace(".png", ""), 10);
      if (isNaN(nationId)) continue;

      const filePath = `graphics/logos/nations/${
        columnName === "image_federation" ? "federations" : "flags"
      }/${file}`;
      const nationExists = databaseInstance.database
        .prepare("SELECT COUNT(*) as count FROM nation WHERE id = ?")
        .get(nationId) as { count: number };

      if (nationExists.count > 0) {
        databaseInstance.database
          .prepare(`UPDATE nation SET ${columnName} = ? WHERE id = ?`)
          .run(filePath, nationId);
      }
    }
  };

  static processNationImages = async (nationsPath: string, database: Database.Database) => {
    const flagsPath = path.join(nationsPath, "flags");
    const federationPath = path.join(nationsPath, "federations");

    if (fs.existsSync(federationPath)) {
      await GameImagesGraphics.processNationType(federationPath, "image_federation", database);
    }

    if (fs.existsSync(flagsPath)) {
      await GameImagesGraphics.processNationType(flagsPath, "image_flag", database);
    }
  };

  static insertImagesAutomatically = async (database: Database.Database) => {
    try {
      const directories = fs.readdirSync(GRAPHICS_FOLDER_PATH, { withFileTypes: true });

      for (const dir of directories) {
        if (dir.isDirectory()) {
          const folderPath = path.join(GRAPHICS_FOLDER_PATH, dir.name);

          if (dir.name === "nations") {
            await GameImagesGraphics.processNationImages(folderPath, database);
          } else {
            await GameImagesGraphics.processClubImages(folderPath, dir.name, database);
          }
        }
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
}

export default GameImagesGraphics;