import { AbstractControl, ControlValueAccessor } from "@angular/forms";
import { ElementRef, OnInit, Component } from "@angular/core";
import { Moment } from "moment";
import { OverlayService } from "angular-io-overlay";
import { ControlValueAccessorProviderFactory, MomentParseFunction, OnChangeHandler, OnTouchedHandler, ValidatorProviderFactory } from "./common";
export declare type ParserFunction = (value: any, parseFn: MomentParseFunction) => Moment;

@Component({
    selector: "date-picker",
    providers: [ControlValueAccessorProviderFactory(DatePicker), ValidatorProviderFactory(DatePicker)],
    styles: [
        `.datepicker-actions__button,.datepicker-actions__input{transition:border-color ease-in-out .15s,box-shadow ease-in-out .15s}.datepicker-actions{display:flex}.datepicker-actions__input{font:1rem/1.5 OpenSans;display:block;width:100%;padding:.375rem .75rem;color:#555;border:1px solid #ccc;border-radius:.25rem;background:#fff;box-shadow:inset 0 1px 1px rgba(0,0,0,.075)}.datepicker-actions__input:focus{border-color:#4d90fe;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.datepicker-actions__button:disabled,.datepicker-actions__input:disabled,.datepicker-actions__input[readonly]{opacity:1;background-color:#eee}.datepicker-actions__button:disabled,.datepicker-actions__input:disabled{cursor:not-allowed}.datepicker-actions__button{margin-left:10px;padding:0 .77rem;border:1px solid #ccc;border-radius:.25em;outline:0;background-color:#fff}.datepicker-actions__button:active,.datepicker-actions__button:focus{border-color:#4d90fe;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)}.datepicker__buttonIcon{display:inline-block;padding:.5em;background-size:contain}.datepicker__buttonIcon-close{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xNDkwIDEzMjJxMCA0MC0yOCA2OGwtMTM2IDEzNnEtMjggMjgtNjggMjh0LTY4LTI4bC0yOTQtMjk0LTI5NCAyOTRxLTI4IDI4LTY4IDI4dC02OC0yOGwtMTM2LTEzNnEtMjgtMjgtMjgtNjh0MjgtNjhsMjk0LTI5NC0yOTQtMjk0cS0yOC0yOC0yOC02OHQyOC02OGwxMzYtMTM2cTI4LTI4IDY4LTI4dDY4IDI4bDI5NCAyOTQgMjk0LTI5NHEyOC0yOCA2OC0yOHQ2OCAyOGwxMzYgMTM2cTI4IDI4IDI4IDY4dC0yOCA2OGwtMjk0IDI5NCAyOTQgMjk0cTI4IDI4IDI4IDY4eiIvPjwvc3ZnPg==)}.datepicker__buttonIcon-calendar{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTc5MiIgaGVpZ2h0PSIxNzkyIiB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xOTIgMTY2NGgyODh2LTI4OGgtMjg4djI4OHptMzUyIDBoMzIwdi0yODhoLTMyMHYyODh6bS0zNTItMzUyaDI4OHYtMzIwaC0yODh2MzIwem0zNTIgMGgzMjB2LTMyMGgtMzIwdjMyMHptLTM1Mi0zODRoMjg4di0yODhoLTI4OHYyODh6bTczNiA3MzZoMzIwdi0yODhoLTMyMHYyODh6bS0zODQtNzM2aDMyMHYtMjg4aC0zMjB2Mjg4em03NjggNzM2aDI4OHYtMjg4aC0yODh2Mjg4em0tMzg0LTM1MmgzMjB2LTMyMGgtMzIwdjMyMHptLTM1Mi04NjR2LTI4OHEwLTEzLTkuNS0yMi41dC0yMi41LTkuNWgtNjRxLTEzIDAtMjIuNSA5LjV0LTkuNSAyMi41djI4OHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDY0cTEzIDAgMjIuNS05LjV0OS41LTIyLjV6bTczNiA4NjRoMjg4di0zMjBoLTI4OHYzMjB6bS0zODQtMzg0aDMyMHYtMjg4aC0zMjB2Mjg4em0zODQgMGgyODh2LTI4OGgtMjg4djI4OHptMzItNDgwdi0yODhxMC0xMy05LjUtMjIuNXQtMjIuNS05LjVoLTY0cS0xMyAwLTIyLjUgOS41dC05LjUgMjIuNXYyODhxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWg2NHExMyAwIDIyLjUtOS41dDkuNS0yMi41em0zODQtNjR2MTI4MHEwIDUyLTM4IDkwdC05MCAzOGgtMTQwOHEtNTIgMC05MC0zOHQtMzgtOTB2LTEyODBxMC01MiAzOC05MHQ5MC0zOGgxMjh2LTk2cTAtNjYgNDctMTEzdDExMy00N2g2NHE2NiAwIDExMyA0N3Q0NyAxMTN2OTZoMzg0di05NnEwLTY2IDQ3LTExM3QxMTMtNDdoNjRxNjYgMCAxMTMgNDd0NDcgMTEzdjk2aDEyOHE1MiAwIDkwIDM4dDM4IDkweiIvPjwvc3ZnPg==)}`
    ],
    template: `
        <span class="datepicker-actions" #datePickerContainer>
            <input [value]="inputText"
                   [disabled]="disabled"
                   (focus)="openPopup()"
                   (blur)="onTouched($event.target.value)"
                   (change)="raiseOnChange($event.target.value)"
                   (keyup.tab)="closePopup()"
                   (keyup.esc)="closePopup()"
                   class="datepicker-actions__input"
                   type="text"/>
            <button [hidden]="!showClearButton"
                    [disabled]="disabled"
                    (click)="clear()"
                    class="datepicker-actions__button"
                    type="button">
                <span class="datepicker__buttonIcon datepicker__buttonIcon-close"></span>
            </button>
            <button [disabled]="disabled"
                    (click)="togglePopup()"
                    (mousedown)="$event.stopPropagation()"
                    class="datepicker-actions__button"
                    type="button">
                <span class="datepicker__buttonIcon datepicker__buttonIcon-calendar"></span>
            </button>
        </span>
        <overlay-host></overlay-host>
    `
})
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
    disabled: boolean;
    align: any;
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
