import SessionSystem from "../session/session";

class GameStateService {
    public static initializeGameState(seasonId: number) {
        const databaseInstance = SessionSystem.getDatabase();
        const sql = "INSERT INTO game_state (current_date, season_id) VALUES (?, ?)";

        databaseInstance.prepare(sql).run("2025-08-01", seasonId);
    }

    public static getCurrentDate(): string {
        const databaseInstance = SessionSystem.getDatabase();
        const row = databaseInstance.prepare("SELECT current_date FROM game_state LIMIT 1").get() as { current_date?: string } | undefined;
        return row?.current_date ?? "";
    }

    public static advanceOneDay() {
        const databaseInstance = SessionSystem.getDatabase();

        const current = new Date(GameStateService.getCurrentDate());
        current.setDate(current.getDate() + 1);

        databaseInstance.prepare("UPDATE game_state SET current_date = ?").run(current.toISOString().split("T")[0]);
    }

    public static getCurrentSeasonId(): number {
        const databaseInstance = SessionSystem.getDatabase();
        const row = databaseInstance.prepare("SELECT season_id FROM game_state LIMIT 1").get() as { season_id?: number } | undefined;
        return row?.season_id ?? 0;
    }
}

export default GameStateService;