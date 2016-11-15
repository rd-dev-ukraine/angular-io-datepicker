import { Moment, utc as parseUtc } from "moment";
import * as m from "moment";
import { deDefaultify } from "../lib/utils";

import { parseError } from "./error";
import { DateTimeOffset } from "../models/dateTimeOffset";

function polyfillIsArray(arg: any): arg is Array<any> {
    const toString = {}.toString;
    return toString.call(arg) === "[object Array]";
}


const isArray: (arg: any) => arg is Array<any> = Array.isArray || polyfillIsArray;
const moment = deDefaultify(m);

export function toMoment(obj: DateTimeOffset): Moment {
    if (!obj || !obj.date) {
        return null;
    }

    return moment(obj.date).utcOffset(60 * obj.offset || 0);
}


export function toDateTimeOffset(obj: Moment): DateTimeOffset {
    if (!obj) {
        return null;
    }

    return {
        date: obj.utc().toDate(),
        offset: obj.local().utcOffset() / 60
    };
}


export function requireObject(json: any, parent?: string): void {
    if (json === null || typeof json !== "object") { throw parseError((parent || "Input") + " must be a non-null object"); }
}


export function extractId(json: any, parent?: string): string {
    const id = json.id || json._id;
    if (id !== undefined && typeof id !== "string") { throw parseError("'" + (parent ? parent + ".id" : "id") + "' must be a string, if specified"); }

    return id;
}


export function getPropertyDescription(propertyName: string, parent?: string): string {
    return parent ? parent + "." + propertyName : propertyName;
}


export function optionalArray<T>(json: any, description: string, parser: (json: any, description: string) => T): T[] {
    if (json === undefined) {
        return [];
    }

    if (!isArray(json)) { throw parseError("'" + description + "' must be an array, if specified"); }

    return (json as Array<any>)
        .map((item, index) => parser(item, description + "[" + index + "]"));
}


export function optionalArrayProperty<T>(json: any, propertyName: string, parser: (json: any, description: string) => T, parent?: string): T[] {
    return optionalArray(json[propertyName], getPropertyDescription(propertyName, parent), parser);
}


export function optionalBoolean(item: any, description: string): boolean {
    return !!item;
}


export function optionalBooleanProperty(json: any, propertyName: string, parent?: string): boolean {
    return optionalBoolean(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function optionalDate(json: any, description: string): Moment {
    const stringValue = optionalString(json, description);

    if (stringValue === "") {
        return undefined;
    }

    const parsed = parseUtc(stringValue);

    if (!parsed.isValid()) {
        throw parseError("'" + description + "' must be a valid date string, if specified");
    }

    return parsed;
}


export function optionalDateProperty(json: any, propertyName: string, parent?: string): Moment {
    return optionalDate(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function optionalDateTimeOffset(json: any, description: string): DateTimeOffset
{
    if (json === null || json === undefined) {
        return null;
    }

    return requireDateTimeOffset(json, description);
}

export function requireDateTimeOffset(json: any, description: string): DateTimeOffset
{
    requireObject(json);

    return {
        date: requireDateProperty(json, "date").toDate(),
        offset: optionalNumberProperty(json, "offset")
    };
}

export function optionalDateTimeOffsetProperty(json: any, propertyName: string, parent?: string): DateTimeOffset {
    return optionalDateTimeOffset(json[propertyName], getPropertyDescription(propertyName, parent));
}

export function requireDate(item: any, description: string): Moment {
    const stringValue = optionalString(item, description);

    if (stringValue === "") { throw parseError("'" + description + "' must be a non-empty date"); }

    const parsed = parseUtc(stringValue);

    if (!parsed.isValid()) {
        throw parseError("'" + description + "' must be a valid date string, if specified");
    }

    return parsed;
}


export function requireDateProperty(json: any, propertyName: string, parent?: string): Moment {
    return requireDate(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function optionalString(json: any, description: string): string {
    if (json !== undefined && json !== null && typeof json !== "string") { throw parseError("'" + description + "' must be a string, if specified"); }

    return json || "";
}


export function optionalStringProperty(json: any, propertyName: string, parent?: string): string {
    return optionalString(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function optionalPhoneNumber(item: any, description: string): string {
    const PhoneRegex = /^(\([0-9]{3}\)|[0-9]{3})[\.\- ]{0,1}([0-9]{3})[\.\- ]{0,1}([0-9]{4})$/;

    const rawString = optionalString(item, description);
    if (rawString === "") { return rawString; }

    const matches = PhoneRegex.exec(rawString);
    if (matches === null) { throw parseError("'" + description + "' must be a valid ten digit phone number, if specified"); }

    return "(" + matches[1].replace(/[\(\)]/g, "") + ") " + matches[2] + "-" + matches[3];
}


export function optionalPhoneNumberProperty(json: any, propertyName: string, parent?: string): string {
    return optionalPhoneNumber(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function requireArray<T>(json: any, description: string, parser: (json: any, description: string) => T): T[] {
    if (!isArray(json)) { throw parseError("'" + description + "' must be an array"); }

    return (json as Array<any>)
        .map((item, index) => parser(item, description + "[" + index + "]"));
}


export function requireArrayProperty<T>(json: any, propertyName: string, parser: (json: any, description: string) => T, parent?: string): T[] {
    return requireArray(json[propertyName], getPropertyDescription(propertyName, parent), parser);
}


export function requireBoolean(item: any, description: string): boolean {
    if (typeof item !== "boolean") { throw parseError("'" + description + "' must be a Boolean value"); }

    return item;
}


export function requireBooleanProperty(json: any, propertyName: string, parent?: string): boolean {
    return requireBoolean(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function optionalNumber(item: any, description: string): number {
    if (item === null || item === undefined) {
        return null;
    }

    return requireNumber(item, description);
}

export function requireNumber(item: any, description: string): number {
    if (typeof item !== "number") { throw parseError("'" + description + "' must be a Number value"); }

    return item;
}

export function optionalNumberProperty(json: any, propertyName: string, parent?: string): number {
    return optionalNumber(json[propertyName], getPropertyDescription(propertyName, parent));
}


export function requireString(item: any, description: string): string {
    if (typeof item !== "string" || item === "") { throw parseError("'" + description + "' must be a non-empty string"); }

    return item;
}


export function requireStringProperty(json: any, propertyName: string, parent?: string): string {
    return requireString(json[propertyName], getPropertyDescription(propertyName, parent));
}
