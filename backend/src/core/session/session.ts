import Database from "better-sqlite3";
import DatabaseSystem from "../database/database";

class SessionSystem {
    private static currentFilename: string | null = null;
    private static database: Database.Database | null = null;

    static newGame(): void {
        if (this.database)
            this.database.close();

        const { database } = DatabaseSystem.connectDatabase("create");

        this.database = database;
        this.currentFilename = null;
    }

    static loadGame(filename: string): void {
        if (this.database)
            this.database.close();

        const { database } = DatabaseSystem.connectDatabase("load", filename);

        this.database = database;
        this.currentFilename = null;
    }

    static getDatabase(): Database.Database {
        if (!this.database)
            throw new Error("No save loaded.");

        return this.database;
    }

    static getCurrentFile(): string | null {
        return this.currentFilename;
    }

    static reset(): void {
        if (this.database) {
            this.database.close();
            this.database = null;
            this.currentFilename = null;
        }
    }
}

export default SessionSystem;