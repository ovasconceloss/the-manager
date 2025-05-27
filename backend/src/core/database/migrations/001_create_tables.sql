CREATE TABLE `season`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `start_year` INT NOT NULL,
    `end_year` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL
);
CREATE TABLE `staff_contract`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `staff_id` INT NOT NULL,
    `club_id` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `salary` FLOAT(53) NOT NULL
);
CREATE TABLE `staff_nation`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `staff_id` INT NOT NULL,
    `nation_id` INT NOT NULL
);
CREATE TABLE `staff`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `birth_date` DATE NOT NULL,
    `function` VARCHAR(255) NOT NULL,
    `tactical_style` INT NOT NULL
);
CREATE TABLE `player_contract`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `club_id` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `salary` FLOAT(53) NOT NULL
);
CREATE TABLE `player_nation`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `nation_id` INT NOT NULL
);
CREATE TABLE `player`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `birth_date` DATE NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `overall` INT NOT NULL,
    `potential` INT NOT NULL,
    `market_value` FLOAT(53) NOT NULL
);
CREATE TABLE `club`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `abbreviation` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `stadium` VARCHAR(255) NOT NULL,
    `nation_id` INT NOT NULL,
    `league_id` INT NOT NULL,
    `reputation` INT NOT NULL
);
CREATE TABLE `league`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `nation_id` INT NOT NULL,
    `reputation` INT NOT NULL
);
CREATE TABLE `nation`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `continent` VARCHAR(255) NOT NULL,
    `reputation` INT NOT NULL
);
CREATE TABLE `match`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `round` INT NOT NULL,
    `season_id` INT NOT NULL,
    `league_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `home_id` INT NOT NULL,
    `away_id` INT NOT NULL,
    `home_score` INT NOT NULL,
    `away_score` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL
);
CREATE TABLE `transfers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `club_from` INT NOT NULL,
    `club_to` INT NOT NULL,
    `value` FLOAT(53) NOT NULL,
    `date` DATE NOT NULL,
    `type` VARCHAR(255) NOT NULL
);
CREATE TABLE `finance`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `club_id` INT NOT NULL,
    `type` INT NOT NULL,
    `description` TEXT NOT NULL,
    `value` FLOAT(53) NOT NULL,
    `date` DATE NOT NULL
);
ALTER TABLE `transfers`
ADD CONSTRAINT `transfers_player_id_foreign` FOREIGN KEY(`player_id`) REFERENCES `player`(`id`);
ALTER TABLE `league`
ADD CONSTRAINT `league_nation_id_foreign` FOREIGN KEY(`nation_id`) REFERENCES `nation`(`id`);
ALTER TABLE `player_contract`
ADD CONSTRAINT `player_contract_player_id_foreign` FOREIGN KEY(`player_id`) REFERENCES `player`(`id`);
ALTER TABLE `player_nation`
ADD CONSTRAINT `player_nation_nation_id_foreign` FOREIGN KEY(`nation_id`) REFERENCES `nation`(`id`);
ALTER TABLE `match`
ADD CONSTRAINT `match_league_id_foreign` FOREIGN KEY(`league_id`) REFERENCES `league`(`id`);
ALTER TABLE `staff_nation`
ADD CONSTRAINT `staff_nation_nation_id_foreign` FOREIGN KEY(`nation_id`) REFERENCES `nation`(`id`);
ALTER TABLE `match`
ADD CONSTRAINT `match_season_id_foreign` FOREIGN KEY(`season_id`) REFERENCES `season`(`id`);
ALTER TABLE `transfers`
ADD CONSTRAINT `transfers_club_from_foreign` FOREIGN KEY(`club_from`) REFERENCES `club`(`id`);
ALTER TABLE `player_contract`
ADD CONSTRAINT `player_contract_club_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `club`(`id`);
ALTER TABLE `player_nation`
ADD CONSTRAINT `player_nation_player_id_foreign` FOREIGN KEY(`player_id`) REFERENCES `player`(`id`);
ALTER TABLE `staff_nation`
ADD CONSTRAINT `staff_nation_staff_id_foreign` FOREIGN KEY(`staff_id`) REFERENCES `staff`(`id`);
ALTER TABLE `match`
ADD CONSTRAINT `match_home_id_foreign` FOREIGN KEY(`home_id`) REFERENCES `club`(`id`);
ALTER TABLE `transfers`
ADD CONSTRAINT `transfers_club_to_foreign` FOREIGN KEY(`club_to`) REFERENCES `club`(`id`);
ALTER TABLE `finance`
ADD CONSTRAINT `finance_club_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `club`(`id`);
ALTER TABLE `match`
ADD CONSTRAINT `match_away_id_foreign` FOREIGN KEY(`away_id`) REFERENCES `club`(`id`);
ALTER TABLE `staff_contract`
ADD CONSTRAINT `staff_contract_club_id_foreign` FOREIGN KEY(`club_id`) REFERENCES `club`(`id`);
ALTER TABLE `club`
ADD CONSTRAINT `club_nation_id_foreign` FOREIGN KEY(`nation_id`) REFERENCES `nation`(`id`);
ALTER TABLE `club`
ADD CONSTRAINT `club_league_id_foreign` FOREIGN KEY(`league_id`) REFERENCES `league`(`id`);
ALTER TABLE `staff_contract`
ADD CONSTRAINT `staff_contract_staff_id_foreign` FOREIGN KEY(`staff_id`) REFERENCES `staff`(`id`);