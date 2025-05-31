import SeasonModel from "../models/seasonModel";
import CalendarService from "../core/simulation/calendarService";
import GameLoopService from "../core/simulation/gameLoopService";
import GameStateService from "../core/simulation/gameStateService";

class SeasonService {
    static async fetchCurrentSeason() {
        return await SeasonModel.getCurrentSeason();
    }

    static async insertSeason() {
        const seasonId = await SeasonModel.createSeason();

        CalendarService.createLeagueFixtures(seasonId);
        GameStateService.initializeGameState(seasonId);

        return seasonId;
    }

    static async advanceDay() {
        GameLoopService.advanceDay();
        return true;
    }
}

export default SeasonService;