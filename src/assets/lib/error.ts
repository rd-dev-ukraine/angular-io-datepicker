import { ValidationErrorHash } from "pojo-fluent-validator";


export interface Error {
    name: string;
    message: string;
    source?: any;
}


export const ErrorNames = {
    Database: "database error",
    NotFound: "not found",
    Parse: "parse error",
    Permission: "permission error",
    Validation: "validation error"
};


export function isError(error: any): error is Error {
    return error &&
        typeof error === "object" &&
        typeof error.name === "string" &&
        typeof error.message === "string";
}


export function isValidationError(error: any): error is ValidationError {
    return isError(error) && error.name === ErrorNames.Validation;
}


export function databaseError(message: string, source?: any): Error {
    return new GenericError(ErrorNames.Database, message, source);
}


export function notFoundError(message: string, source?: any): Error {
    return new GenericError(ErrorNames.NotFound, message, source);
}


export function parseError(message: string, source?: any): Error {
    return new GenericError(ErrorNames.Parse, message, source);
}


export function permissionError(message: string, source?: any): Error {
    return new GenericError(ErrorNames.Permission, message, source);
}


export class GenericError implements Error {

    constructor(public name: string, public message: string, public source?: any) { }


    toString(): string {
        return this.name + ": " + this.message;
    }

}


export class ValidationError implements Error {

    static fromMessage(message: string): ValidationError {
        return new ValidationError({
            [""]: [message]
        });
    }


    name = ErrorNames.Validation;
    message = "";


    constructor(public errors: ValidationErrorHash) {
        this.message = ((errors || {})[""] || []).join(" ");
    }

}
