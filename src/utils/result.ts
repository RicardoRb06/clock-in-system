import type { Request, Response } from 'express';


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

export function complete<T>(res: Response, status: number, data: T) {
    return res.status(status).json({
        success: true,
        data: data,
    });
}

export function fail(res: Response, error: Error) {
    return res.status(400).json({
        success: false,
        message: error.message
    });
}