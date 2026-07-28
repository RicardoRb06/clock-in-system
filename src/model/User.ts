export enum ROLES {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"    
}

export class User {
    private _name: string;
    private _passwordHash: string;
    private _isWorking: boolean;
    private _isActive: boolean;
    private _role: ROLES;

    constructor(name: string, passwordHash: string, isWorking: boolean, role: ROLES) {
        this._name = name;
        this._passwordHash = passwordHash;
        this._isWorking = isWorking;
        this._isActive = true;
        this._role = role;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get passwordHash(): string {
        return this._passwordHash;
    }

    public set passwordHash(passwordHash: string) {
        this._passwordHash = passwordHash;
    }

    public get isWorking(): boolean {
        return this._isWorking;
    }

    public set isWorking(isWorking: boolean) {
        this._isWorking = isWorking;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public set isActive(isActive: boolean) {
        this._isActive = isActive;
    }

    public get role(): ROLES {
        return this._role;
    }

    public set role(role: ROLES) {
        this._role = role;
    }
}
