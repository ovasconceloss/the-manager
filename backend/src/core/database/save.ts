import os from "os";
import fs from "fs";
import path from "path";

class SaveSystem {
    private static basePath(): string {
        const documents = process.env.DOCUMENTS || path.join(os.homedir(), "Documents");
        return path.resolve(documents, "ProPlay Games", "The Manager 2025", "games");
    }

    private static generateSaveName(): string {
        const dateObject = new Date();

        const [year, month, day, time] = [
            dateObject.getFullYear(),
            String(dateObject.getMonth() + 1).padStart(2, "0"),
            String(dateObject.getDate() + 1).padStart(2, "0"),
            dateObject.getTime()
        ];

        return `save_${year}-${month}-${day}-${time}.tm`;
    }

    static createNewSavePath(): string {
        const fileName = this.generateSaveName();
        const fullPath = path.join(this.basePath(), fileName);

        const directory = path.dirname(fullPath);

        if (!fs.existsSync(directory))
            fs.mkdirSync(directory, { recursive: true });

        return fullPath;
    }

    static getSavePath(fileName: string): string {
        const fullPath = path.join(this.basePath(), fileName);

        if (!fs.existsSync(fullPath))
            throw new Error(`Save file not found: ${fileName}`);

        return fullPath;
    }
}

export default SaveSystem;