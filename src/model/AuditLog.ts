export enum ACTION {
    CLOCK_IN = "Registro de entrada",
    CLOCK_OUT = "Registro de saída",
    CREATE_USER = "Criar usuário",
    USER_CREATED = "Usuário criado",
    DELETE_USER = "Deletar usuário",
    GENERATE_REPORT = "Gerar relatório"
}

export class AuditLog {
    private _id: string;
    private _userId: string;
    private _action: ACTION;
    private _dateHour: Date;

    constructor(userId: string, action: ACTION) {
        this._id = crypto.randomUUID();
        this._userId = userId;
        this._action = action;
        this._dateHour = new Date();
    }
    
    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get userId(): string {
        return this._userId;
    }

    public get action(): ACTION {
        return this._action;
    }

    public get dateHour(): Date {
        return this._dateHour;
    }

    public set dateHour(dateHour: Date) {
        this._dateHour = dateHour;
    }

    public fromPersistance(data: { id: string, userId: string, action: ACTION, dateHour: Date }): AuditLog {
        const log = new AuditLog(data.userId, data.action);
        log.id = data.id;
        log.dateHour = data.dateHour;

        return log;
    }

}