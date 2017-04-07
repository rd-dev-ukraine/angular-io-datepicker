export const enum AlignType {
    Left = 1,
    Top = 1,
    Center = 2,
    Middle = 2,
    Right = 3,
    Bottom = 3
}


export interface ElementAlign {
    horizontal: AlignType;
    vertical: AlignType;
}


export interface Alignment {
    element: ElementAlign;
    target: ElementAlign;
}


export interface Point {
    top: number;
    left: number;
}


export interface Rect extends Point {
    width: number;
    height: number;
}


const defaultAlign: Alignment = {
    element: {
        horizontal: AlignType.Left,
        vertical: AlignType.Top
    },
    target: {
        horizontal: AlignType.Left,
        vertical: AlignType.Bottom
    }
};


function segmentPositioningPoint(start: number, length: number, align: AlignType): number {
    switch (align) {
        case AlignType.Left:
            return start;
        case AlignType.Center:
            return start + (length / 2);
        case AlignType.Right:
            return start + length;
        default:
            throw new Error("Unknown align option.");
    }
}


function elementPositioningPoint(element: Rect, align: ElementAlign): Point {
    return {
        left: segmentPositioningPoint(element.left, element.width, align.horizontal),
        top: segmentPositioningPoint(element.top, element.height, align.vertical)
    };
}


/** Align @{element} with specified @{target} by calculating new @{element} position rectangle. */
function positionElement(element: Rect, target: Rect, alignment: Alignment): Rect {
    const elementPoint = elementPositioningPoint(element, alignment.element);
    const targetPoint = elementPositioningPoint(target, alignment.target);

    const offset = {
        left: targetPoint.left - elementPoint.left,
        top: targetPoint.top - elementPoint.top
    };
    return {
        left: element.left + offset.left,
        top: element.top + offset.top,
        width: element.width,
        height: element.height
    };
}


export function position(element: Rect, target: Rect, ...positions: Alignment[]): Rect {
    positions = positions || [defaultAlign];
    return positionElement(element, target, positions[0]);
}
