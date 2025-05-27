import { BaseError } from "./BaseError";

export class ServerError extends BaseError {
    constructor(statusCode: number, message: string) {
        super(message, statusCode);
    }
}