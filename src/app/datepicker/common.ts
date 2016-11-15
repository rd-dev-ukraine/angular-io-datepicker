import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Provider, Type } from "@angular/core";
import { Moment } from "moment";
import * as m from "moment";

import { deDefaultify  } from "../../assets/lib/utils";


export type DatePickerMode = "date" | "datetime" | "time";

export type OnChangeHandler = (value: any) => void;


export interface MomentParseFunction {
    (value: any, format?: string | string[], strictParsing?: boolean): Moment;
}


export function local(value?: any, format?: string | string[], strictParsing?: boolean): Moment {
    const moment = deDefaultify(m);
    return moment(value, format, strictParsing);
}


export function ControlValueAccessorProviderFactory(type: Type<any>): Provider {
    return {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => type),
            multi: true
        };
}
