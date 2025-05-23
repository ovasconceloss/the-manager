import fs from "fs";
import os from "os";
import path from "path";

class SaveSystem {
    static createSaveName = (): string => {
        const date = new Date();
    
        const [year, month, day, milliseconds] = [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, '0'),
            String(date.getDate()).padStart(2, '0'),
            String(date.getMilliseconds()).padStart(3, '0'),
        ];
    
        return `save_${year}-${month}-${day}-${milliseconds}.tm`;
    }
    
    static ensureSavesFolder = () => {
        const userDocumentsPath = process.env.DOCUMENTS || path.join(os.homedir(), 'Documents');
        const saveFilePath = path.resolve(userDocumentsPath, "ProPlay Games", "The Manager 2025", "games",  SaveSystem.createSaveName());
    
        try {
            const saveFolderPath = path.dirname(saveFilePath);
            if (!fs.existsSync(saveFolderPath)) fs.mkdirSync(saveFolderPath, { recursive: true });
    
            return saveFilePath;
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    static loadSaveFile = (filePath: string): string => {
        const userDocumentsPath = process.env.DOCUMENTS || path.join(os.homedir(), 'Documents');
        const saveFilePath = path.resolve(userDocumentsPath, "ProPlay Games", "The Manager 2025", "games",  filePath);

        try {
            if (fs.existsSync(saveFilePath)) {
                return saveFilePath;
            } else {
                console.error(`Save file not found: ${filePath}`);
                process.exit(1);
            }
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }
}

export default SaveSystem;