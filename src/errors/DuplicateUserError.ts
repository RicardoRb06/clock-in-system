export class DuplicateUserError extends Error{
    constructor(name: string){
        super(`Usuário ${name} já existe`);
        this.name = "DuplicateUserError";
    }
}