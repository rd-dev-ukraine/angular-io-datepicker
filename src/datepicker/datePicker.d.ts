import { AbstractControl, ControlValueAccessor } from "@angular/forms";
import { ElementRef, OnInit } from "@angular/core";
import { Moment } from "moment";
import { OverlayService } from "angular-io-overlay";
import { MomentParseFunction, OnChangeHandler, OnTouchedHandler } from "./common";
export declare type ParserFunction = (value: any, parseFn: MomentParseFunction) => Moment;
export declare class DatePicker implements ControlValueAccessor, OnInit {
    private overlayService;
    private _value;
    private _popupRef;
    private parseValue;
    datePickerContainer: ElementRef;
    mode: "date" | "datetime" | "time";
    displayDateMode: "day" | "month" | "year";
    showClearButton: boolean;
    format: string;
    isMeridiem: boolean;
    disabled: boolean;
    align: any;
    closeBySelection: boolean;
    inputClass: string;
    onChange: OnChangeHandler;
    onTouched: OnTouchedHandler;
    inputText: string;
    constructor(overlayService: OverlayService);
    ngOnInit(): void;
    writeValue(value: string): void;
    registerOnChange(fn: OnChangeHandler): void;
    registerOnTouched(fn: OnTouchedHandler): void;
    validate(c: AbstractControl): {
        [key: string]: any;
    };
    /** Raises handers registered by ControlValueAccessor.registerOnChange method with converted value. */
    raiseOnChange(value: string): void;
    togglePopup(): void;
    openPopup(): void;
    closePopup(): void;
    clear(): void;
    getCSSClasses(): string;
    readonly isUsingMeridiem: boolean;
    /**
     * Formats input value based on current input type.
     * Value converted to local before formatting.
     */
    private formatValue(value);
    /** Format based on date picker current type. */
    private readonly currentFormat;
    private updateControlText(formattedValue);
    private convertValue(value);
}
