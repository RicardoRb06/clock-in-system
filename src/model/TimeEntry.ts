export class TimeEntry {
    private readonly _id: string;
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
}
