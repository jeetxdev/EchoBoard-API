class ApiError<T = unknown> extends Error {
    statusCode: number;
    error: T | null;
    isOperational?: boolean;

    constructor(statusCode: number, message: string, error: T | null, isOperational?: boolean, stack?: string) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;