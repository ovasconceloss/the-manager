import { POSITION_DISTRIBUTION, POSITION_GROUPS } from "../data/positions";
import { Faker, pt_BR, pt_PT, en, es, fr, it, de, nl, faker as fakerEN } from "@faker-js/faker";

export const selectValue = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const randomValues = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const expandPositions = (positionGroup: keyof typeof POSITION_DISTRIBUTION, count: number) => {
    const positions = POSITION_GROUPS[positionGroup];
    const result: string[] = [];
    for (let counter = 0; counter < count; counter++) {
        result.push(selectValue(positions));
    }
    return result;
};

export const getFakerByNation = (nation: string): Faker => {
    switch (nation) {
        case "Brazil": return new Faker({ locale: [pt_BR] });
        case "Argentina": return new Faker({ locale: [es] });
        case "Spain": return new Faker({ locale: [es] });
        case "France": return new Faker({ locale: [fr] });
        case "Germany": return new Faker({ locale: [de] });
        case "Italy": return new Faker({ locale: [it] });
        case "Netherlands": return new Faker({ locale: [nl] });
        case "Belgium": return new Faker({ locale: [nl, fr, de] });
        case "Portugal": return new Faker({ locale: [pt_PT] });
        case "England":
        default:
            return new Faker({ locale: [en] });
    }
};