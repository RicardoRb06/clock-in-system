import { TimeEntry } from '../../src/model/TimeEntry.js';

type TimeEntryFactoryOverrides = {
    id?: string;
    userId?: string;
    startTime?: Date;
    endTime?: Date;
};

export function makeTimeEntry(overrides: TimeEntryFactoryOverrides = {}): TimeEntry {
    const timeEntry = new TimeEntry(
        overrides.userId ?? "defaultUserId",
        overrides.startTime ?? new Date(),
    );
    if (overrides.id) timeEntry.id = overrides.id;
    if (overrides.endTime) timeEntry.clockOut = overrides.endTime;
    return timeEntry;
}