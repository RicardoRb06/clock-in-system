import { TimeEntry } from '../../src/model/TimeEntry.js';

type TimeEntryFactoryOverrides = {
    id?: string;
    userId?: string;
    clockIn?: Date;
    clockOut?: Date;
};

export function makeTimeEntry(overrides: TimeEntryFactoryOverrides = {}): TimeEntry {
    const timeEntry = new TimeEntry(
        overrides.userId ?? "defaultUserId",
        overrides.clockIn ?? new Date(),
    );
    if (overrides.id) timeEntry.id = overrides.id;
    if (overrides.clockOut) timeEntry.clockOut = overrides.clockOut;
    return timeEntry;
}