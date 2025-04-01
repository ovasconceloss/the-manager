import fs from "fs";
import os from "os";
import path from "path";
import SaveSystem from "./saves";
import Database from "better-sqlite3";

class DatabaseSystem {
    static createStaticDatabase = (): Database.Database => {
        const userConfigPath = process.env.APPDATA || path.join(os.homedir());
        const databasePath = path.resolve(userConfigPath, "The Manager 2025", "TM2025_STATIC.db");

        try {
            const databaseFolderPath = path.dirname(databasePath);
            if (!fs.existsSync(databaseFolderPath)) fs.mkdirSync(databaseFolderPath, { recursive: true });

            const database = new Database(databasePath);

            this.executeStaticMigrations(database);

            return database;
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

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

    static executeStaticMigrations = (database: Database.Database) => {
        const migrationsPath = path.resolve(__dirname, "../migrations/static");

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

    static connectDatabase = (action: "load" | "create", fileName?: string): { database: Database.Database; isNew: boolean } => {
        try {
            if (action === "load") {
                const database = this.loadDatabase(fileName!);
                return { database, isNew: false };
            } else if (action === "create") {
                const database = this.createDatabase();
                return { database, isNew: true };
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