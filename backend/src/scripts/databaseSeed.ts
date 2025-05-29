import Database from "better-sqlite3";
import { NATIONS } from "../data/nations";
import { CLUBS_BY_NATION } from "../data/clubs";
import SeedService from "../services/seedService";
import { getFakerByNation, randomValues } from "../utils/utils";

const databaseInstance = new Database("./src/core/database/default/default.db");

databaseInstance.transaction(() => {
    const nationStatement = databaseInstance.prepare("INSERT INTO nation (name, continent, reputation) VALUES (?, ?, ?)");
    const leagueStatement = databaseInstance.prepare("INSERT INTO league (name, nation_id, reputation) VALUES (?, ?, ?)");
    const clubStatement = databaseInstance.prepare("INSERT INTO club (name, abbreviation, city, stadium, nation_id, league_id, reputation) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const playerStatement = databaseInstance.prepare("INSERT INTO player (first_name, last_name, birth_date, position, overall, potential, market_value) VALUES (?, ?, ?, ?, ?, ?, ?)");
    const contractStatement = databaseInstance.prepare("INSERT INTO player_contract (player_id, club_id, start_date, end_date, salary) VALUES (?, ?, ?, ?, ?)");
    const playerNationStatement = databaseInstance.prepare("INSERT INTO player_nation (player_id, nation_id) VALUES (?, ?)");
    const staffStatement = databaseInstance.prepare("INSERT INTO staff (first_name, last_name, birth_date, function, tactical_style) VALUES (?, ?, ?, ?, ?)");
    const staffContractStatement = databaseInstance.prepare("INSERT INTO staff_contract (staff_id, club_id, start_date, end_date, salary) VALUES (?, ?, ?, ?, ?)");
    const staffNationStatement = databaseInstance.prepare("INSERT INTO staff_nation (staff_id, nation_id) VALUES (?, ?)");

    for (const nation of NATIONS) {
        const faker = getFakerByNation(nation.name);
        const clubs = CLUBS_BY_NATION[nation.name] ?? [];

        const nationId = SeedService.seedNation(nationStatement, nation);
        const leagueId = SeedService.seedLeague(leagueStatement, nationId, nation);

        for (const clubDataRaw of clubs) {
            const clubData = clubDataRaw ?? {
                name: faker.company.name(),
                city: faker.location.city(),
                stadium: `${faker.company.name()} Arena`
            };
            const clubReputation = randomValues(30, 90);
            const clubId = SeedService.seedClub(clubStatement, clubData, nationId, leagueId, clubReputation);

            SeedService.seedStaff(staffStatement, staffNationStatement, staffContractStatement, faker, nationId, clubId);
            SeedService.seedPlayers(playerStatement, contractStatement, playerNationStatement, faker, clubId, nationId);
        }
    }
})();

console.info("Fictitious data successfully generated.");