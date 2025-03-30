import fs from "fs";
import path from "path";
import SaveSystem from "./saves";
import Database from "better-sqlite3";

class DatabaseSystem {
    static createDatabase = (): Database.Database => {
        const databasePath = SaveSystem.ensureSavesFolder();
        const database = new Database(databasePath);

        this.executeMigrations(database);

        return database;
    }

    static loadDatabase = (fileName: string): Database.Database => {
        if (!fileName) throw new Error("File name is required to load a database.");

        const databasePath = SaveSystem.loadSaveFile(fileName);

        return new Database(databasePath);
    };

    static executeMigrations = (database: Database.Database) => {
        const migrationsPath = path.resolve(__dirname, "../migrations");

        try {
            const migrationFiles = fs.readdirSync(migrationsPath).filter(file => file.endsWith(".sql"));

            for (const file of migrationFiles) {
                const filePath = path.join(migrationsPath, file);
                const sql = fs.readFileSync(filePath, "utf-8");

                database.exec(sql);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    static connectDatabase = (action: "load" | "create", fileName?: string): Database.Database => {
        try {
            if (action === "load") {
                return this.loadDatabase(fileName!);
            } else if (action === "create") {
                return this.createDatabase();
            } else {
                throw new Error("Invalid action. Use 'load' or 'create'.");
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    };
}

export default DatabaseSystem;