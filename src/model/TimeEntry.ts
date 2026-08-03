export class TimeEntry {
    private _id: string;
    private _userId: string;
    private _clockIn: Date;
    private _clockOut: Date | null;

    constructor(userId: string, clockIn: Date) {
        this._id = crypto.randomUUID();
        this._userId = userId;
        this._clockIn = clockIn;
        this._clockOut = null;
    }

    public get id(): string {
        return this._id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get clockIn(): Date {
        return this._clockIn;
    }

    public get clockOut(): Date | null {
        return this._clockOut;
    }

    public set clockOut(clockOut: Date | null) {
        this._clockOut = clockOut;
    }

    public getDuration(): number | null {
        if(this._clockOut === null) {
            return null;
        }

        const duration = (this._clockOut.getTime() - this._clockIn.getTime()) / 1000;

        return duration;
    }

    public static fromPersistnce(data: { id: string, userId: string, clockIn: string, clockOut: string | null }): TimeEntry {
        const timeEntry = new TimeEntry(data.userId, new Date(data.clockIn));
        timeEntry._id = data.id;
        timeEntry._clockOut = data.clockOut ? new Date(data.clockOut) : null;   

        return timeEntry;
    }
}
