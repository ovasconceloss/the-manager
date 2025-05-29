import ClubModel from "../models/clubModel";

class ClubService {
    static async fetchClubById(clubId: number) {
        return ClubModel.getClubById(clubId);
    }

    static async fetchClubByLeague(leagueId: number) {
        return ClubModel.getClubByLeague(leagueId);
    }
}

export default ClubService;