export type Match = {
    id: number;
    home_id: number;
    away_id: number;
    date: string;
    status: string;
    home_score?: number;
    away_score?: number;
};