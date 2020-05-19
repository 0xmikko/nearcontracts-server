import {Request} from "express";

export interface RequestWithUser extends Request {
    user?: {
        user_id: string,
        role: string,
        exp: number,
    }
}
