import GameStateService from "./gameStateService";
import MatchSimulationService from "./matchSimulationService";

class GameLoopService {
    public static advanceDay() {
        const todayDate = GameStateService.getCurrentDate();

        MatchSimulationService.simulateTodayMatches(todayDate);
        GameStateService.advanceOneDay();
    }
}

export default GameLoopService;