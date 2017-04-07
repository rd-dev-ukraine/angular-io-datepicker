import * as moment from "moment";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Provider, Type } from "@angular/core";


export type OnChangeHandler = (value: any) => void;
export type OnTouchedHandler = (value: any) => void;

export interface MomentParseFunction {
    (value: any, format?: string | string[], strictParsing?: boolean): moment.Moment;
}

export function local(value?: any, format?: string | string[], strictParsing?: boolean): moment.Moment {
    return moment(value, format, strictParsing);
}

export function ControlValueAccessorProviderFactory(type: Type<any>): Provider {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

export function ValidatorProviderFactory(type: Type<any>): Provider {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

