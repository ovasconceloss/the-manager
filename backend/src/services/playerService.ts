import PlayerModel from "../models/playerModel";

class PlayerService {
    static async fetchPlayerById(playerId: number) {
        return PlayerModel.getPlayerById(playerId);
    }

    static async fetchPlayerByName(playerName: string) {
        return PlayerModel.getPlayerByName(playerName);
    }

    static async fetchPlayerByClub(clubId: number) {
        return PlayerModel.getPlayerByClub(clubId);
    }
}

export default PlayerService;