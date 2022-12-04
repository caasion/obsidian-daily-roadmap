import moment from 'moment';
import { App, Editor, MarkdownView, MetadataCache, Modal, Notice, Plugin, TFile, Vault } from 'obsidian';
import { createDailyNote, getAllDailyNotes, getDailyNote } from 'obsidian-daily-notes-interface';
import DailyRoadmapFile from './file';
import DailyRoadmapParser from './parser';
import { DailyRoadmapSettings, DailyRoadmapSettingTab, DEFAULT_SETTINGS } from './settings'


export default class DailyRoadmap extends Plugin {
	settings: DailyRoadmapSettings;
  file: DailyRoadmapFile;
  parser: DailyRoadmapParser;
  vault: Vault;
  cache: MetadataCache;

	async onload() {
		await this.loadSettings();
    this.file = new DailyRoadmapFile(this.app.vault, this.settings)
    this.parser = new DailyRoadmapParser(this.settings)
    this.vault = this.app.vault;

		this.addCommand({
			id: 'basic-task-parsing',
			name: 'Basic Parsing of a Task',
			callback: async () => {
				let file = getDailyNote(moment(), getAllDailyNotes());
        if (!file) {
          file = await createDailyNote(moment());
        }
        console.log(file)
        console.log(await this.vault.cachedRead(file))
        // TODO: Get the contents of the file i retrieved
        // if (fileContents) {
        //   const parsedFileContents = this.parser.parseFileIntoTasks(fileContents)
        //   console.log(parsedFileContents)
        // }
        
		}});

		this.addSettingTab(new DailyRoadmapSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}