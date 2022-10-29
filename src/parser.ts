import { DailyRoadmapSettings } from "./settings";

interface task {
    task: string;
    // start: string;
    // end: string;
}

interface time {
    hour: number;
    minute: number;
}

export default class DailyRoadmapParser {
    settings: DailyRoadmapSettings;

    constructor(settings: DailyRoadmapSettings) {
        this.settings = settings;
    }

    parseFileIntoTasks(fileContents: string) {
        const matches = [];
        let match;
        fileContents.split('\n').forEach((line, i) => {
            match = /- \[(.)\] (?<task>.*?) @ (?<start>\d{1,2}:\d{1,2}) \/ (?<end>\d{1,2}:\d{1,2})/gmi.exec(line)
            if (match) {
                matches.push({index: i, value: {full: match[0], task: match.groups?.task, start: this.parseTime(match.groups.start, "24"), end: this.parseTime(match.groups.end, "24")}})
            }
        })
        return matches
    }

    parseTime(time: string, type: string): time {
        if (type == "24") {
            const { groups: {hour, minute} } = /(?<hour>\d{1,2}):(?<minute>\d{1,2})/g.exec(time)
            return {hour, minute}
        } 

    }

    checkAndCompareTimes(startTime: number, endTime: number) {

    }
}