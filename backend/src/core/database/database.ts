import fs from "fs";
import path from "path";
import SaveSystem from "./save";
import Database from "better-sqlite3";

class DatabaseSystem {
    private static getMigrationsPath(): string {
        return path.resolve(__dirname, "migrations");
    }

    private static executeMigrations(database: Database.Database): void {
        const migrationsPath = this.getMigrationsPath();

        if (!fs.existsSync(migrationsPath))
            throw new Error("Migrations folder not found.");

        const migrationsFiles = fs.readdirSync(migrationsPath).filter(file => file.endsWith(".sql")).sort();

        for (const file of migrationsFiles) {
            const filePath = path.join(migrationsPath, file);
            const sqlFile = fs.readFileSync(filePath, "utf-8");

            database.exec(sqlFile);
        }
    }

    static createDatabase(): Database.Database {
        const databasePath = SaveSystem.createNewSavePath();
        const database = new Database(databasePath);

        this.executeMigrations(database);

        return database;
    }

    static loadDatabase(filename: string): Database.Database {
        if (!filename)
            throw new Error("The file name is required to load a save.");

        const databasePath = SaveSystem.getSavePath(filename);

        return new Database(databasePath);
    }

    static connectDatabase(action: "load" | "create", filename?: string): { database: Database.Database; isNew: boolean } {
        try {
            if (action === "create") {
                const databaseInstance = this.createDatabase();
                return { database: databaseInstance, isNew: true };
            }

            const databaseInstance = this.loadDatabase(filename!);
            return { database: databaseInstance, isNew: false };
        } catch (err) {
            console.error("Failed to connect to the database:", err);
            throw err;
        }
    }
}

export default DatabaseSystem;