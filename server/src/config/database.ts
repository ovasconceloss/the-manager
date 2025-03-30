import SaveSystem from "./saves";
import Database from "better-sqlite3";

class DatabaseSystem {
    static createDatabase = (): string => { return SaveSystem.ensureSavesFolder(); }

    static loadDatabase = (fileName: string): string => {
        if (!fileName) throw new Error("File name is required to load a database.");

        return SaveSystem.loadSaveFile(fileName);
    }

    static connectDatabase = (action: "load" | "create", fileName?: string) => {
        try {
            const databasePath = action === "load" ? DatabaseSystem.loadDatabase(fileName!) : DatabaseSystem.createDatabase();
            return new Database(databasePath);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

export default DatabaseSystem;