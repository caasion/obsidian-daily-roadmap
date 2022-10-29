import { App, Editor, MarkdownView, Modal, Notice, Plugin, TFile } from 'obsidian';
import DailyRoadmapFile from './file';
import DailyRoadmapParser from './parser';
import { DailyRoadmapSettings, DailyRoadmapSettingTab, DEFAULT_SETTINGS } from './settings'


export default class DailyRoadmap extends Plugin {
	settings: DailyRoadmapSettings;
  file: DailyRoadmapFile;
  parser: DailyRoadmapParser

	async onload() {
		await this.loadSettings();
    this.file = new DailyRoadmapFile(this.app.vault, this.settings)
    this.parser = new DailyRoadmapParser(this.settings)

		this.addCommand({
			id: 'basic-task-parsing',
			name: 'Basic Parsing of a Task',
			callback: async () => {
				const fileContents = await this.file.getFileContents("Testing.md")
        if (fileContents) {
          const parsedFileContents = this.parser.parseFileIntoTasks(fileContents)
          console.log(parsedFileContents)
        }
        
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