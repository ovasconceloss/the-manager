import { Manager } from "../types/manager";
import DatabaseSystem from "../config/database";

class ManagerModel {
    static async insertManager(manager: Manager) {
        const databaseInstance = DatabaseSystem.connectDatabase("load", "filename");
        const sql = `
            INSERT INTO coach (first_name, last_name, birth_date, matches, wins, draws, losses, nation_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, (SELECT id FROM nation WHERE code = ?))
        `;

        const insertManagerResult = databaseInstance.database.prepare(sql).run(
            manager.first_name, manager.last_name, manager.birth_date, 0, 0, 0, 0, manager.nation_id
        );

        return insertManagerResult.lastInsertRowid as number;
    }
}

export default ManagerModel;