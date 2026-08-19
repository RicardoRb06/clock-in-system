export enum ROLES {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator",
    TIME_ENTRY = "time entry",
}

export enum CATEGORY {
    SOCCER_2D = "soccer 2D",
    LINE_CHASER = "line chaser",
    COMBAT = "combat",
    SUMO = "sumo",
    MARKETING = "marketing"
}

export class User {
    private _id: string;
    private _name: string;
    private _passwordHash: string;
    private _isWorking: boolean;
    private _isActive: boolean;
    private _role: ROLES;
    private _category: CATEGORY;

    constructor(name: string, passwordHash: string, category: CATEGORY) {
        this._id = crypto.randomUUID();
        this._name = name;
        this._passwordHash = passwordHash;
        this._isWorking = false;
        this._isActive = true;
        this._role = ROLES.USER;
        this._category = category;
    }

    public get id(): string {
        return this._id;
    }

    public set id(id: string) {
        this._id = id;
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

    public get category(): CATEGORY {
        return this._category;
    }

    public set category(category: CATEGORY) {
        this._category = category;
    }

    public static fromPersistence(data: { id: string; name: string; passwordHash: string; isActive: boolean; role: string; category: string}): User {
        const user = new User(data.name, data.passwordHash, data.category as CATEGORY);
        user._id = data.id;
        user.isActive = data.isActive;
        user.role = data.role as ROLES;
        return user;
    }
}
