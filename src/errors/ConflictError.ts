export class ConflictError extends Error {
    constructor() {
        super("Já existe um registro com as mesmas informações no sistema.");
        this.name = "ConflictError";
    }
}
