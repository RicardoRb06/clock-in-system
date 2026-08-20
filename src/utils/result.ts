export type Result<T, E = Error> = 
    | {success: true; data?: T}
    | {success: false; error: E};


export function ok<T>(data?: T): Result<T> {
    if(data) {
        return { success: true, data: data};
    }

    return { success: true };
    
}

export function err(error: Error): Result<never> {
    return { success: false, error: error};
}