import { Match } from "../../types/match";
import SessionSystem from "../session/session";

class MatchSimulationService {
    public static simulateTodayMatches(currentDate: string) {
        const databaseInstance = SessionSystem.getDatabase();
        const sql = "SELECT * FROM match WHERE date = ? AND status = 'scheduled'";

        const matches = databaseInstance.prepare(sql).all(currentDate) as Match[];

        for (const match of matches) {
            const homeOverall = MatchSimulationService.clubStrength(match.home_id);
            const awayOverall = MatchSimulationService.clubStrength(match.away_id);

            const homeScore = Math.max(0, Math.round((Math.random() * homeOverall) / 30));
            const awayScore = Math.max(0, Math.round((Math.random() * awayOverall) / 30));

            const sql = "UPDATE match SET home_score = ?, away_score = ?, status = 'played' WHERE id = ?";
            databaseInstance.prepare(sql).run(homeScore, awayScore, match.id)
        }
    }

    private static clubStrength(clubId: number): number {
        const databaseInstance = SessionSystem.getDatabase();
        const sql = "SELECT AVG(overall) as avg FROM player_contract pc JOIN player p ON pc.player_id = p.id WHERE club_id = ?"

        const avg = databaseInstance.prepare(sql).get(clubId) as { avg: number } | undefined;
        return avg?.avg || 60;
    }
}

export default MatchSimulationService;