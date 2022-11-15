/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';

interface ScheduleDay {
  time: string;
  group: ScheduleGroup;
}

type ScheduleGroup = 'group 1' | 'group 2' | 'group 3';

const parseScheduleFile = (filePath: string) => {
  const str = fs.readFileSync(filePath, 'utf-8');
  if (!str) return console.error('No file content');
  const lines = str.split('\n');
  let colDayMap: Record<number, string> = {};
  const schedule: Record<string, ScheduleDay[]> = {};
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;
    if (i === 0) {
      colDayMap = daysRowToColMap(line);
      continue;
    }
    const cols = line.split(',');
    const time = cols[0];
    if (!time) throw new Error('No time');
    for (let j = 1; j < cols.length; j++) {
      const dayName = colDayMap[j];
      if (!dayName) throw new Error(`No day name for column ${j}`);
      const group = strToGroup(cols[j]);
      if (!schedule[dayName]) schedule[dayName] = [];
      schedule[dayName].push({ time, group });
    }
  }
  const fileName = path.basename(filePath, '.csv');
  fs.writeFileSync(path.resolve(__dirname, `./${fileName}.json`), JSON.stringify(schedule, null, 2));
};

const daysRowToColMap = (line: string): Record<number, string> => {
  const days = line.split(',');
  const res: Record<number, string> = {};
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (!day) continue;
    const dayStr = day.replace(/[^\d]/g, '');
    if (!dayStr) throw new Error(`Parsing day str error: ${dayStr}`);
    const dayNum = parseInt(dayStr, 10);
    if (isNaN(dayNum)) throw new Error(`Parsing day str error: ${dayStr}`);
    res[i] = `2022-11-${pad(dayNum, 2)}`;
  }
  return res;
};

const strToGroup = (str: string): ScheduleGroup => {
  if (str.indexOf('1') !== -1) return 'group 1';
  if (str.indexOf('2') !== -1) return 'group 2';
  if (str.indexOf('3') !== -1) return 'group 3';
  throw new Error(`Unable to parse group ${str}`);
};

const pad = (val: number | string, max: number): string => {
  const str = val.toString();
  return str.length < max ? pad(`0${str}`, max) : str;
};

parseScheduleFile(path.resolve(__dirname, './november-2022_high.csv'));
parseScheduleFile(path.resolve(__dirname, './november-2022_low.csv'));
