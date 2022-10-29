import { App, PluginSettingTab, Setting } from "obsidian";
import DailyRoadmap from "./main";
import { getAllDailyNotes, getDailyNote, getDailyNoteSettings } from "obsidian-daily-notes-interface";


export interface DailyRoadmapSettings {
  //timeline
  timelineClock: boolean;
  timelineNowAndNext: boolean;
  timelineZoomLevel: number;
  timelineRefreshRate: number;
  //statusBar
  statusBarCircularProgress: boolean;
  statusBarNowAndNext: boolean;
  showTaskNotification: boolean;
  //parsing
  taskTimeMatch: string;
  taskTimeType: string;
  taskStartTimeSymbol?: string; 
  taskEndTimeSymbol?: string;
  taskTimeRegex?: string;
  // file modification
  taskAutoComplete: string;
  taskAutoCompleteMark?: string;
}

export const DEFAULT_SETTINGS: Partial<DailyRoadmapSettings> = {
  timelineClock: true,
  timelineNowAndNext: true,
  timelineZoomLevel: 2,
  //statusBar
  statusBarCircularProgress: false,
  statusBarNowAndNext: false,
  showTaskNotification: false,
  //parsing
  taskTimeMatch: 'Front',
  taskTimeType: 'Start',
  // file modification
  taskAutoComplete: 'None',
}

const taskTimeMatchOptions: Record<string, string> = {
  front: "Front",
  end: "End",
  regex: "Regex",
}

const taskTimeType: Record<string, string> = {
  start: "Start Time",
  end: "End Time",
  both: "Both",
}

export class DailyRoadmapSettingTab extends PluginSettingTab {
	plugin: DailyRoadmap;

	constructor(app: App, plugin: DailyRoadmap) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Daily Roadmap Settings'});

    new Setting(containerEl)
      .setName('Task Time Match')
      .setDesc('Where to match for task time')
      .addDropdown((dropdown) => {
        dropdown
          .addOptions(taskTimeMatchOptions)
          .setValue(this.plugin.settings.taskTimeMatch)
          .onChange(async (value) => {
            this.plugin.settings.taskTimeMatch = value;
            await this.plugin.saveSettings();
          })
      })

    new Setting(containerEl)
      .setName('Task Time Type')
      .setDesc('What the time in a task indicates')
      .addDropdown((dropdown) => {
        dropdown
          .addOptions(taskTimeType)
          .setValue(this.plugin.settings.taskTimeType)
          .onChange(async (value) => {
            this.plugin.settings.taskTimeType = value;
            await this.plugin.saveSettings();
          })
      })

    new Setting(containerEl)
      .setName('Timeline Clock')
      .setDesc('Display a clock in the timeline')
      .addToggle(toggle => 
      toggle
        .setValue(this.plugin.settings.timelineClock)
        .onChange( async (value: boolean) => {
          this.plugin.settings.timelineClock = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Timeline Now & Next')
      .setDesc('Display the current and next task in the timeline')
      .addToggle(toggle => 
      toggle
        .setValue(this.plugin.settings.timelineClock)
        .onChange( async (value:boolean) => {
          this.plugin.settings.timelineClock = value;
          await this.plugin.saveSettings();
        }));
	}
}