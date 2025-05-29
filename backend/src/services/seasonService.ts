import SeasonModel from "../models/seasonModel";

class SeasonService {
    static async fetchCurrentSeason() {
        return await SeasonModel.getCurrentSeason();
    }

    static async insertSeason() {
        return await SeasonModel.createSeason();
    }
}

export default SeasonService;