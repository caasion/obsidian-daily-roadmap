import { TFile, Vault } from "obsidian";
import { DailyRoadmapSettings } from "./settings";

export default class DailyRoadmapFile {
    vault: Vault;
    settings: DailyRoadmapSettings;

    constructor(vault: Vault, settings: DailyRoadmapSettings) {
        this.vault = vault;
        this.settings = settings;
    }

    public async getFileContents(filePath: string) {
        try {
            const abstractFile = this.vault.getAbstractFileByPath(filePath)

            if (abstractFile instanceof TFile) {
                return await this.vault.cachedRead(abstractFile)
            }
        } catch (error) {
            console.log(error)
        }
    }
}