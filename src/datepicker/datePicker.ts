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
    styleUrls: ["./datepicker.css"],
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

    public constructor(private overlayService: OverlayService) {}

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
