import fs from "fs";
import os from "os";
import path from "path";
import Database from "better-sqlite3";

class StaticDatabase {
    private static instance: Database.Database;

    static async checkStaticDatabaseExists() {
        const userConfigPath = process.env.APPDATA || path.join(os.homedir());
        const databasePath = path.resolve(userConfigPath, "The Manager 2025", "TM2025_STATIC.db");

        return fs.existsSync(databasePath);
    }

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

    static connectDatabase = () => {
        const userConfigPath = process.env.APPDATA || path.join(os.homedir());
        const databasePath = path.resolve(userConfigPath, "The Manager 2025", "TM2025_STATIC.db");

        if (!this.instance) this.instance = new Database(databasePath, { readonly: true });

        return this.instance;
    }

    static getClubs() {
        const databaseInstance = this.connectDatabase();
        const databaseStatement = databaseInstance.prepare("SELECT id, name, country, logo FROM clubs");
        return databaseStatement.all();
    }
}

export default StaticDatabase;