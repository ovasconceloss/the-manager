import LeagueModel from "../models/leagueModel";

class LeagueService {
    static async fetchAllLeagues() {
        return LeagueModel.getAllLeagues();
    }

    static async fetchLeagueById(leagueId: number) {
        return LeagueModel.getLeagueById(leagueId);
    }
}

export default LeagueService;