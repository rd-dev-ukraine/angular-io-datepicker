import { FormControl, ControlValueAccessor} from "@angular/forms";
import { Component, ComponentRef, ElementRef, Input, ViewChild, OnInit } from "@angular/core";
import { Moment, utc } from "moment";

import { AlignType, OverlayService } from "../overlay";

import { ControlValueAccessorProviderFactory, DatePickerMode, local, MomentParseFunction } from "./common";
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
    providers: [ControlValueAccessorProviderFactory(DatePicker)],
    styleUrls: ["./datepicker.css"],
    template: `
        <span class="datepicker-actions" #datePickerContainer>
            <input [value]="inputText"
                   [id]="id" 
                   [disabled]="disabled"
                   [class.ng-invalid]="!control.valid"
                   (change)="raiseOnChange($event.target.value)"
                   (focus)="openPopup()"
                   (blur)="control.markAsTouched()"
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
    @Input() inputText: string = "";


    onChange: any;
    onTouched: any;

    @Input() control: FormControl;
    @Input() mode: DatePickerMode = 'date';
    @Input() showClearButton: boolean = true;
    @Input() format: string;
    @Input() id: string;
    @Input() disabled: boolean;


    constructor(
        private overlayService: OverlayService
    ) {
        this.control = new FormControl();
    }


    ngOnInit(): void {
        this.parseValue = parserFabric(this.mode, this.currentFormat);
        this.updateControlText(this.formatValue(this.control.value));
        if (!this.disabled) {
            this.control.updateValueAndValidity({onlySelf: true});
        }
    }


    writeValue(fn: any): void {
        fn(this._value);
    }


    registerOnChange(fn: any): void {
        this.onChange = fn;
    }


    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }


    /** Raises handers registered by ControlValueAccessor.registerOnChange method with converted value. */
    raiseOnChange(value: any): void {
        this.control.markAsDirty();
        const parsed = this.parseValue(value, local);
        if (!parsed) {
            this._value = null;
            this.control.setValue("");
            this.updateControlText("");
        }
        else if (parsed.isValid()) {
            // If format is not contains time (only date)
            // do not convert a value to UTC (to prevent date shift)
            this._value = this.convertValue(parsed);
            if (this.onChange) {
                this.onChange(this._value);
            }

            this.control.setValue(this._value);
            const formatted = this.formatValue(this._value);
            this.updateControlText(formatted);
        } else {
            this.updateControlText(value);
            this.control.setValue(value);
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
                alignment: {
                    element: {
                        horizontal: AlignType.Left,
                        vertical: AlignType.Top
                    },
                    target: {
                        horizontal: AlignType.Left,
                        vertical: AlignType.Bottom
                    }
                },
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
        const format = this.format || defaultFormat[type];

        return format;
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
            return value.utc().clone();
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
