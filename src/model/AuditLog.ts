export class AuditLog {
    private _id: string;
    private _userId: string;
    private _action: string;
    private _dateHour: Date;

    constructor(id: string, userId: string, action: string) {
        this._id = id;
        this._userId = userId;
        this._action = action;
        this._dateHour = new Date();
    }
    
    public get id(): string {
        return this._id;
    }
    
    public get userId(): string {
        return this._userId;
    }

    public get action(): string {
        return this._action;
    }

    public get dateHour(): Date {
        return this._dateHour;
    }

}