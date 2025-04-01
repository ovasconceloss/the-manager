import StaticModel from "../models/static.model";

class StaticService {
    static async fetchClubsByNation(nation: string) {
        return await StaticModel.getClubsByNation(nation);
    }
}

export default StaticService;