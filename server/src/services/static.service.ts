import DatabaseSystem from "../config/database";
import StaticModel from "../models/static.model";
import { setDatabaseInstance } from "../config/databaseInstance";

class StaticService {
    static async fetchClubsByNation(nation: string) {
        return await StaticModel.getClubsByNation(nation);
    }

    static async createSaveDatabase() {
        const database = DatabaseSystem.connectDatabase("create");
        setDatabaseInstance(database);
    }
}

export default StaticService;