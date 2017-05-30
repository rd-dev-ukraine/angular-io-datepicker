import { AbstractControl, ControlValueAccessor } from "@angular/forms";
import { Component, ComponentRef, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Moment, utc } from "moment";

import { OverlayService } from "angular-io-overlay";

import { ControlValueAccessorProviderFactory, local, MomentParseFunction, OnChangeHandler, OnTouchedHandler, ValidatorProviderFactory } from "./common";
import { DatePickerPanel } from "./datePickerPanel";


type DatePickerMode = "date" | "datetime" | "time";

const dateParseData = {
    separators: ["/", "\\", "-", "."],
    day: ["DD", "D"],
    month: ["MM", "M"],
    year: ["YYYY", "YY"]
};

function generateDateParseFormatsFromParts(firstPart: string[], secondPart: string[], thirdPart: string[]): string[] {
    const result: string[] = [];

    for (const separator of dateParseData.separators) {
        for (const third of thirdPart) {
            for (const second of secondPart) {
                for (const first of firstPart) {
                    result.push(`${first}${separator}${second}${separator}${third}`);
                }
            }
        }
    }

    return result;
}

function generateDateParseFormats(): string[] {
    return [
        ...generateDateParseFormatsFromParts(dateParseData.month, dateParseData.day, dateParseData.year),
        ...generateDateParseFormatsFromParts(dateParseData.day, dateParseData.month, dateParseData.year),
        ...generateDateParseFormatsFromParts(dateParseData.year, dateParseData.month, dateParseData.day),
        ...generateDateParseFormatsFromParts(dateParseData.year, dateParseData.day, dateParseData.month)
    ];
}

const parseFormat: { [type: string]: string[] } = {
    "date": generateDateParseFormats(),
    "datetime": ["LLL"],
    "time": ["H:M", "hh:mm A", "LT", "LTS"]
};

const defaultFormat: { [type: string]: string; } = {
    "date": "LL",
    "datetime": "LLL",
    "time": "LT"
};

export type ParserFunction = (value: any, parseFn: MomentParseFunction) => Moment;

/**
 * Parses the given value as date using moment.js.
 * If value cannot be parsed the invalid Moment object is returned.
 * The calling code should not assume if the method returns local or utc value and
 * must convert value to corresponding form itself.
 */
function parserFabric(mode: DatePickerMode, format: string): ParserFunction {
    return (value: any, parseFn: MomentParseFunction): Moment => {
        parseFn = parseFn || utc;

        if (value === null || value === undefined || value === "") {
            return null;
        }

        const formatsToParse = parseFormat[mode || "date"];
        return parseFn(value, [format, ...formatsToParse], true);
    };
}

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
export class DatePicker implements ControlValueAccessor, OnInit {
    private _value: Moment;
    private _popupRef: ComponentRef<any>;
    private parseValue: ParserFunction;

    @ViewChild("datePickerContainer")
    public datePickerContainer: ElementRef;
    @Input()
    public mode: "date" | "datetime" | "time" = "date";
    @Input()
    public displayDateMode: "day" | "month" | "year" = "day";
    @Input()
    public showClearButton: boolean = true;
    @Input()
    public format: string;
    @Input()
    public disabled: boolean;
    @Input()
    public align: any;

    public onChange: OnChangeHandler;
    public onTouched: OnTouchedHandler;
    public inputText: string = "";

    public constructor(private overlayService: OverlayService) {
    }

    public ngOnInit(): void {
        this.parseValue = parserFabric(this.mode, this.currentFormat);
    }

    public writeValue(value: string): void {
        if (value) {
            this.raiseOnChange(value);
        }
    }

    public registerOnChange(fn: OnChangeHandler): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: OnTouchedHandler): void {
        this.onTouched = fn;
    }

    public validate(c: AbstractControl): { [key: string]: any } {
        const value = this.parseValue(c.value, local);
        const err = {
            "parseError": "value has not been parsed"
        };

        if (c.pristine && !c.touched) return null;

        return value && !value.isValid() ? err : null;
    }

    /** Raises handers registered by ControlValueAccessor.registerOnChange method with converted value. */
    public raiseOnChange(value: string): void {
        const parsed = this.parseValue(value, local);

        if (!parsed) {
            this._value = null;
            this.updateControlText("");
        }
        else if (parsed.isValid()) {
            this._value = this.convertValue(parsed);

            const formatted = this.formatValue(this._value);
            this.updateControlText(formatted);
        } else {
            this.updateControlText(value);
        }

        this.onChange && this.onChange(this.convertValue(parsed));
    }

    public togglePopup(): void {
        if (this._popupRef) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }

    public openPopup(): void {
        if (this._popupRef) {
            return;
        }

        const val = this._value;

        this.overlayService.openComponentInPopup<DatePickerPanel>(
            DatePickerPanel,
            {
                alignWithElement: this.datePickerContainer,
                alignment: this.align,
                closeOnClick: true
            }
        ).then(c => {
            this._popupRef = c;
            this._popupRef.onDestroy(() => {
                this._popupRef = null;
            });

            c.instance.mode = this.mode;
            console.log(this.displayDateMode);
            c.instance.displayDateMode = this.displayDateMode;
            c.instance.writeValue(val);
            c.instance.registerOnChange((v: any) => this.raiseOnChange(v));
        });
    }

    public closePopup(): void {
        if (this._popupRef) {
            this._popupRef.destroy();
            this._popupRef = null;
        }
    }

    public clear(): void {
        this.raiseOnChange("");
    }

    /**
     * Formats input value based on current input type.
     * Value converted to local before formatting.
     */
    private formatValue(value: Moment): string {
        if (!value || !value.isValid()) {
            return "";
        }

        const mode: "date" | "datetime" | "time" = this.mode || "date";

        if (mode === "date") {
            return value.clone().format(this.currentFormat);
        }

        return value.clone().local().format(this.currentFormat);
    }

    /** Format based on date picker current type. */
    private get currentFormat(): string {
        return this.format || defaultFormat[this.mode || "date"];
    }

    private updateControlText(formattedValue: string): void {
        this.inputText = formattedValue;
    }

    private convertValue(value: Moment): Moment {
        if (!value || !value.isValid()) {
            return value;
        }

        const mode: "date" | "datetime" | "time" = this.mode || "date";
        if (mode === "date") {
            return utc({ year: value.year(), month: value.month(), date: value.date() });
        } else {
            return value.clone().utc();
        }
    }
}
