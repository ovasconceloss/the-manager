import SessionSystem from "../core/session/session";

class SeasonModel {
    static async getCurrentSeason() {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT 
                season.id, 
                season.start_year, 
                season.end_year, 
                season.status
            FROM season
            WHERE status = 'in_progress'
            LIMIT 1;
        `;

        return databaseInstance.prepare(sql).get();
    }

    static async createSeason() {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `INSERT INTO season (start_year, end_year, status) VALUES (?, ?, ?)`;
        const insertSeasonResult = databaseInstance.prepare(sql).run(2025, 2026, "in_progress");

        return insertSeasonResult.lastInsertRowid as number;
    }
}

export default SeasonModel;