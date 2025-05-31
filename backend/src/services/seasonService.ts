import SeasonModel from "../models/seasonModel";

class SeasonService {
    static async fetchCurrentSeason() {
        return await SeasonModel.getCurrentSeason();
    }

    static async insertSeason() {
        const seasonId = await SeasonModel.createSeason();

        return seasonId;
    }
}

export default SeasonService;