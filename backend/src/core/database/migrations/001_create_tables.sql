CREATE TABLE `season` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `start_year` INT NOT NULL,
    `end_year` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL
);

CREATE TABLE `nation` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `continent` VARCHAR(255) NOT NULL,
    `reputation` INT NOT NULL
);

CREATE TABLE `league` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `nation_id` INT NOT NULL,
    `reputation` INT NOT NULL,
    FOREIGN KEY (`nation_id`) REFERENCES `nation`(`id`)
);

CREATE TABLE `club` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `abbreviation` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `stadium` VARCHAR(255) NOT NULL,
    `nation_id` INT NOT NULL,
    `league_id` INT NOT NULL,
    `reputation` INT NOT NULL,
    FOREIGN KEY (`nation_id`) REFERENCES `nation`(`id`),
    FOREIGN KEY (`league_id`) REFERENCES `league`(`id`)
);

CREATE TABLE `staff` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `birth_date` DATE NOT NULL,
    `function` VARCHAR(255) NOT NULL,
    `tactical_style` INT NOT NULL
);

CREATE TABLE `staff_contract` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `staff_id` INT NOT NULL,
    `club_id` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `salary` FLOAT(53) NOT NULL,
    FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`),
    FOREIGN KEY (`club_id`) REFERENCES `club`(`id`)
);

CREATE TABLE `staff_nation` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `staff_id` INT NOT NULL,
    `nation_id` INT NOT NULL,
    FOREIGN KEY (`staff_id`) REFERENCES `staff`(`id`),
    FOREIGN KEY (`nation_id`) REFERENCES `nation`(`id`)
);

CREATE TABLE `player` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `nation_id` INTEGER NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `birth_date` DATE NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `overall` INT NOT NULL,
    `potential` INT NOT NULL,
    `market_value` FLOAT(53) NOT NULL
);

CREATE TABLE `player_contract` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `player_id` INT NOT NULL,
    `club_id` INT NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `salary` FLOAT(53) NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `player`(`id`),
    FOREIGN KEY (`club_id`) REFERENCES `club`(`id`)
);

CREATE TABLE `match` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `round` INT NOT NULL,
    `season_id` INT NOT NULL,
    `league_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `home_id` INT NOT NULL,
    `away_id` INT NOT NULL,
    `home_score` INT NOT NULL,
    `away_score` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`season_id`) REFERENCES `season`(`id`),
    FOREIGN KEY (`league_id`) REFERENCES `league`(`id`),
    FOREIGN KEY (`home_id`) REFERENCES `club`(`id`),
    FOREIGN KEY (`away_id`) REFERENCES `club`(`id`)
);

CREATE TABLE `transfers` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `player_id` INT NOT NULL,
    `club_from` INT NOT NULL,
    `club_to` INT NOT NULL,
    `value` FLOAT(53) NOT NULL,
    `date` DATE NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`player_id`) REFERENCES `player`(`id`),
    FOREIGN KEY (`club_from`) REFERENCES `club`(`id`),
    FOREIGN KEY (`club_to`) REFERENCES `club`(`id`)
);

CREATE TABLE `finance` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `club_id` INT NOT NULL,
    `type` INT NOT NULL,
    `description` TEXT NOT NULL,
    `value` FLOAT(53) NOT NULL,
    `date` DATE NOT NULL,
    FOREIGN KEY (`club_id`) REFERENCES `club`(`id`)
);

CREATE TABLE `game_state` (
    `id` INTEGER PRIMARY KEY AUTOINCREMENT,
    `current_date` TEXT NOT NULL,
    `season_id` INTEGER NOT NULL,
    FOREIGN KEY (`season_id`) REFERENCES `season`(`id`)
);