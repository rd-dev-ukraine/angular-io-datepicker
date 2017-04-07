import * as moment from "moment";
import { Provider, Type } from "@angular/core";
export declare type OnChangeHandler = (value: any) => void;
export declare type OnTouchedHandler = (value: any) => void;
export interface MomentParseFunction {
    (value: any, format?: string | string[], strictParsing?: boolean): moment.Moment;
}
export declare function local(value?: any, format?: string | string[], strictParsing?: boolean): moment.Moment;
export declare function ControlValueAccessorProviderFactory(type: Type<any>): Provider;
export declare function ValidatorProviderFactory(type: Type<any>): Provider;
