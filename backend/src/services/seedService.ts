import { NATIONS } from "../data/nations";
import { LEAGUE_NAMES_BY_NATION } from "../data/leagues";
import { expandPositions, getFakerByNation, randomValues } from "../utils/utils";

class SeedService {
    static seedNation(statement: any, nation: any) {
        statement.run(nation.name, nation.continent, nation.reputation);
        return statement.database.prepare('SELECT last_insert_rowid() as id').get().id;
    }

    static seedLeague(statement: any, nationId: any, nation: any) {
        const leagueName = LEAGUE_NAMES_BY_NATION[nation.name] ?? `${nation.name} Premier League`;
        const information = statement.run(leagueName, nationId, nation.reputation);
        return information.lastInsertRowid;
    }

    static seedClub(statement: any, clubData: any, nationId: any, leagueId: any, clubReputation: any) {
        const information = statement.run(
            clubData.name,
            clubData.name.substring(0, 3).toUpperCase(),
            clubData.city,
            clubData.stadium,
            nationId,
            leagueId,
            clubReputation
        );
        return information.lastInsertRowid;
    }

    static seedStaff(staffStatement: any, staffNationStatement: any, staffContractStatement: any, faker: any, nationId: any, clubId: any) {
        const staffFirstName = faker.person.firstName("male");
        const staffLastName = faker.person.lastName("male");
        const staffBirthDate = faker.date.birthdate({ mode: "year", min: 1970, max: 1988 });
        const staffTacticalStyle = randomValues(1, 5);

        const information = staffStatement.run(staffFirstName, staffLastName, staffBirthDate.toISOString(), "Coach", staffTacticalStyle);
        const staffId = information.lastInsertRowid;

        staffNationStatement.run(staffId, nationId);
        staffContractStatement.run(staffId, clubId, "2025-07-01", "2028-06-30", randomValues(10000, 50000));
        return staffId;
    }

    static seedPlayers(playerStatement: any, contractStatement: any, localFaker: any, clubId: any, localNationId: any) {
        const playerPositions = [
            ...expandPositions("GK", 2),
            ...expandPositions("DEF", 8),
            ...expandPositions("MID", 8),
            ...expandPositions("ATT", 7),
        ];

        for (let i = playerPositions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [playerPositions[i], playerPositions[j]] = [playerPositions[j], playerPositions[i]];
        }

        const totalPlayers = playerPositions.length;
        const localPlayers = Math.floor(totalPlayers * 0.6);
        const foreignNations = NATIONS.filter(nation => nation.id !== localNationId);

        for (let i = 0; i < totalPlayers; i++) {
            let faker: any;
            let nationId: number;

            const position = playerPositions[i];


            if (i < localPlayers) {
                faker = localFaker;
                nationId = localNationId;
            } else {
                const randomNation = foreignNations[Math.floor(Math.random() * foreignNations.length)];

                nationId = randomNation.id;
                faker = getFakerByNation(randomNation.name);
            }

            const playerFirstName = faker.person.firstName("male");
            const playerLastName = faker.person.lastName("male");
            const playerBirthDate = faker.date.birthdate({ mode: "year", min: 1995, max: 2005 });
            const playerOverall = randomValues(55, 85);
            const playerPotential = randomValues(playerOverall, 95);
            const playerMarketValue = parseFloat((randomValues(500000, 10000000) / 100).toFixed(2));

            const information = playerStatement.run(
                nationId,
                playerFirstName,
                playerLastName,
                playerBirthDate.toISOString(),
                position,
                playerOverall,
                playerPotential,
                playerMarketValue
            );

            const playerId = information.lastInsertRowid;

            contractStatement.run(playerId, clubId, "2025-07-01", "2029-06-30", randomValues(3000, 15000));
        }

    }
}

export default SeedService;