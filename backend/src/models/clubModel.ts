import SessionSystem from "../core/session/session";

class ClubModel {
    static async getClubByLeague(leagueId: number) {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT
                club.*,
                league.id,
                nation.id,
                nation.name as nation_name
            FROM club
            LEFT JOIN league ON league.id = club.league_id
            LEFT JOIN nation ON nation.id = club.nation_id
            WHERE league.id = ?
        `;

        return databaseInstance.prepare(sql).get(leagueId);
    }
}

export default ClubModel;