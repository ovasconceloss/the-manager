import StaticDatabase from "../config/staticDatabase";

class StaticModel {
    static async getClubsByNation(nation: string) {
        const databaseInstance = StaticDatabase.connectDatabase();
        const sql = `
            SELECT club.id, club.name, club.nation_id, club.image_logo 
            FROM club 
            LEFT JOIN nation ON club.nation_id = nation.id 
            WHERE nation.name = ?
        `;

        return databaseInstance.prepare(sql).all(nation);
    }
}

export default StaticModel;