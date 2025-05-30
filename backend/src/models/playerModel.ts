import SessionSystem from "../core/session/session";

class PlayerModel {
    static async getPlayerById(playerId: number) {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT
                player.*,
                player_contract.*,
                club.*,
                nation.id as nation_id,
                nation.name as nationality
            FROM player
            LEFT JOIN player_contract ON player_contract.player_id = player.id
            LEFT JOIN club ON club.id = player_contract.club_id
            LEFT JOIN nation ON nation.id = player.nation_id
            WHERE
                player.first_name LIKE ?
                OR player.last_name LIKE ?
                OR (player.first_name || ' ' || player.last_name) LIKE ?
        `;

        return databaseInstance.prepare(sql).get(playerId);
    }

    static async getPlayerByName(playerName: string) {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT
                player.*,
                player_contract.*,
                club.*,
                nation.id as nation_id,
                nation.name as nationality
            FROM player
            LEFT JOIN player_contract ON player_contract.player_id = player.id
            LEFT JOIN club ON club.id = player_contract.club_id
            LEFT JOIN nation ON nation.id = player.nation_id
            WHERE player.name = ?
        `;

        const queryNameLike = `%${playerName}%`;
        return databaseInstance.prepare(sql).get(queryNameLike, queryNameLike, queryNameLike);
    }

    static async getPlayerByClub(clubId: number) {
        const databaseInstance = SessionSystem.getDatabase();

        const sql = `
            SELECT
                player.*,
                player_contract.*,
                club.*,
                nation.id as nation_id,
                nation.name as nationality
            FROM player
            LEFT JOIN player_contract ON player_contract.player_id = player.id
            LEFT JOIN club ON club.id = player_contract.club_id
            LEFT JOIN nation ON nation.id = player.nation_id
            WHERE player_contract.club_id = ?
        `;

        return databaseInstance.prepare(sql).all(clubId);
    }
}

export default PlayerModel;