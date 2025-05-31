import SessionSystem from "../core/session/session";

class LeagueModel {
    static async getAllLeagues() {
        const databaseInstance = SessionSystem.getDatabase();

        const sql =
            `SELECT
                league.id,
                league.name,
                league.nation_id,
                league.reputation,
                nation.id,
                nation.name as nation_name
            FROM league
            LEFT JOIN nation ON nation.id = league.nation_id
        `;

        return databaseInstance.prepare(sql).all();
    }

    static async getLeagueById(leagueId: number) {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT
                league.id,
                league.name,
                league.nation_id,
                league.reputation,
                nation.id,
                nation.name as nation_name
            FROM league
            LEFT JOIN nation ON nation.id = league.nation_id
            WHERE league.id = ?
        `;

        return databaseInstance.prepare(sql).get(leagueId);
    }
}

export default LeagueModel;