import SessionSystem from "../session/session"

class CalendarService {
    public static createLeagueFixtures(seasonId: number) {
        const databaseInstance = SessionSystem.getDatabase();
        const leagues = databaseInstance.prepare("SELECT league.id FROM league").all();

        for (const league of leagues as { id: number }[]) {
            const clubs = databaseInstance.prepare("SELECT club.id FROM club WHERE league_id = ?").all(league.id);
            const clubIds = clubs.map((club: any) => club.id);

            const fixtures = CalendarService.roundRobin(clubIds);

            fixtures.forEach((round, i) => {
                const matchDate = CalendarService.calculateMatchDate(i);

                for (const [homeId, awayId] of round) {
                    databaseInstance.prepare(`
                        INSERT INTO match (round, season_id, league_id, date, home_id, away_id, home_score, away_score, status)
                        VALUES (?, ?, ?, ?, ?, ?, 0, 0, 'scheduled')
                    `).run(i + 1, seasonId, league.id, matchDate, homeId, awayId);
                }
            });
        }
    }

    private static roundRobin(clubs: number[]): [number, number][][] {
        const fixtures: [number, number][][] = [];
        const totalRounds = clubs.length - 1;
        const halfSize = clubs.length / 2;

        const teams = [...clubs];
        const fixed = teams.shift()!;

        for (let round = 0; round < totalRounds; round++) {
            const roundMatches: [number, number][] = [];
            roundMatches.push([fixed, teams[0]]);

            for (let i = 1; i < halfSize; i++) {
                roundMatches.push([teams[i], teams[teams.length - i]]);
            }

            teams.splice(0, 0, teams.pop()!);
            fixtures.push(roundMatches);
        }

        return fixtures;
    }

    private static calculateMatchDate(round: number): string {
        const baseDate = new Date("2025-08-01");
        baseDate.setDate(baseDate.getDate() + round * 7);
        return baseDate.toISOString().split("T")[0];
    }
}

export default CalendarService;