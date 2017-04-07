import { ControlValueAccessor, AbstractControl } from "@angular/forms";
import { Component, ComponentRef, ElementRef, Input, ViewChild, OnInit } from "@angular/core";
import { Moment, utc } from "moment";

import { AlignType, OverlayService } from "../overlay";

import { ControlValueAccessorProviderFactory, ValidatorProviderFactory, DatePickerMode, local, MomentParseFunction, OnChangeHandler, OnTouchedHandler } from "./common";
import { DatePickerPanel } from "./datePickerPanel";


const dateParseData = {
    separators: ["/", "\\", "-", "."],
    day: ["DD", "D"],
    month: ["MM", "M"],
    year: ["YYYY", "YY"]
};


function generateDateParseFormatsFromParts(firstPart: string[], secondPart: string[], thirdPart: string[]): string[] {
    const result: string[] = [];

    for (let separator of dateParseData.separators) {
        for (let third of thirdPart) {
            for (let second of secondPart) {
                for (let first of firstPart) {
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


@Component({
    selector: "date-picker",
    providers: [ControlValueAccessorProviderFactory(DatePicker), ValidatorProviderFactory(DatePicker)],
    styleUrls: ["./datepicker.css"],
    template: `
        <span class="datepicker-actions" #datePickerContainer>
            <input [value]="inputText"
                   [disabled]="disabled"
                   (change)="raiseOnChange($event.target.value)"
                   (focus)="openPopup()"
                   (blur)="onTouched()"
                   (keydown.tab)="closePopup()"
                   (keydown.esc)="closePopup()"
                   class="datepicker-actions__input"
                   type="text" />
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

    @ViewChild("datePickerContainer") datePickerContainer: ElementRef;

    private onChange: OnChangeHandler;
    private onTouched: OnTouchedHandler;

    inputText: string = "";
    @Input() mode: DatePickerMode = "date";
    @Input() showClearButton: boolean = true;
    @Input() format: string;
    @Input() disabled: boolean;
    @Input() align: any;


    constructor(private overlayService: OverlayService) {}


    ngOnInit(): void {
        this.parseValue = parserFabric(this.mode, this.currentFormat);
    }


    writeValue(value): void {
        if (value) {
            this.raiseOnChange(value);
        }
    }


    registerOnChange(fn: OnChangeHandler): void {
        this.onChange = fn;
    }


    registerOnTouched(fn: OnTouchedHandler): void {
        this.onTouched = fn;
    }

    validate(c: AbstractControl) : {[key: string]: any} {
        const value = this.parseValue(c.value, local);
        const err = {
            "parseError": "value has not been parsed"
        };

        if (c.pristine && !c.touched) return null;

        return !value.isValid() ? err : null;
    }


    /** Raises handers registered by ControlValueAccessor.registerOnChange method with converted value. */
    raiseOnChange(value: any): void {
        const parsed = this.parseValue(value, local);
        if (!parsed) {
            this._value = null;
            this.updateControlText("");
        }
        else if (parsed.isValid()) {
            // If format is not contains time (only date)
            // do not convert a value to UTC (to prevent date shift)
            this._value = this.convertValue(parsed);

            const formatted = this.formatValue(this._value);
            this.updateControlText(formatted);
        } else {
            this.updateControlText(value);
        }
        if (this.onChange) {
            this.onChange(this.convertValue(parsed));
        }
    }


    togglePopup(): void {
        if (this._popupRef) {
            this.closePopup();
        } else {
            this.openPopup();
        }
    }


    openPopup(): void {
        if (this._popupRef) {
            return;
        }

        const val = this._value;

        this.overlayService.openComponentInPopup<DatePickerPanel>(
            DatePickerPanel, {
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
            c.instance.writeValue(val);
            c.instance.registerOnChange((v: any) => this.raiseOnChange(v));
        });
    }


    closePopup(): void {
        if (this._popupRef) {
            this._popupRef.destroy();
            this._popupRef = null;
        }
    }


    clear(): void {
        this.raiseOnChange(null);
    }

    /**
     * Formats input value based on current input type.
     * Value converted to local before formatting.
     */
    private formatValue(value: Moment): string {
        if (!value || !value.isValid()) {
            return "";
        }

        const mode: DatePickerMode = this.mode || "date";

        if (mode === "date") {
            return value.clone().format(this.currentFormat);
        }

        return value.clone().local().format(this.currentFormat);
    }


    /** Format based on date picker current type. */
    private get currentFormat(): string {
        const type = this.mode || "date";

        return this.format || defaultFormat[type];
    }


    private updateControlText(formattedValue: string): void {
        this.inputText = formattedValue;
    }


    private convertValue(value: Moment): Moment {
        if (!value || !value.isValid()) {
            return value;
        }

        const mode: DatePickerMode = this.mode || "date";
        if (mode === "date") {
            return utc({ year: value.year(), month: value.month(), date: value.date() });
        } else {
            return value.clone().utc();
        }
    }

    /** UTC representation of current control value. */
    private _value: Moment;
    private _popupRef: ComponentRef<any>;
    private parseValue: ParserFunction;
}


export type ParserFunction = (value: any, parseFn: MomentParseFunction) => Moment

/**
 * Parses the given value as date using moment.js.
 * If value cannot be parsed the invalid Moment object is returned.
 * The calling code should not assume if the method returns local or utc value and
 * must convert value to corresponding form itself.
 */
function parserFabric( mode, format): ParserFunction {
    return (value: any, parseFn: MomentParseFunction): Moment => {
        parseFn = parseFn || utc;

        if (value === null || value === undefined || value === "") {
            return null;
        }

        const formatsToParse = parseFormat[mode || "date"];
        return parseFn(value, [format, ...formatsToParse], true);
    };
}
