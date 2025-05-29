import ClubModel from "../models/clubModel";

class ClubService {
    static async fetchClubByLeague(leagueId: number) {
        return ClubModel.getClubByLeague(leagueId);
    }
}

export default ClubService;