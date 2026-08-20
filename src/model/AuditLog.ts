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
    
    public get userId(): string {
        return this._userId;
    }

    public get action(): ACTION {
        return this._action;
    }

    public get dateHour(): Date {
        return this._dateHour;
    }

}