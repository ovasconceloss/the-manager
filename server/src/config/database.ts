import SaveSystem from "./saves";
import Database from "better-sqlite3";

const connectDatabase = () => {
    try {
        const database = new Database(SaveSystem.ensureSavesFolder());
        return database;
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
}

export default connectDatabase;