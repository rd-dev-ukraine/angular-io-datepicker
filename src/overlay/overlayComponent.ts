import {
    OnInit, Component, ComponentRef, ComponentFactoryResolver, ElementRef, Renderer, Type, ViewChild,
    ViewContainerRef, ChangeDetectorRef
} from "@angular/core";

import { Alignment, Point, position, Rect } from "./positioning";


@Component({
    host: {
        "[class.fixed]": "positionFixed",
        "[style.left.px]": "left",
        "[style.top.px]": "top"
    },
    selector: "overlay",
    template: "<template #container></template>",
    styles: [
        `
        :host {
            position: absolute;
            z-index: 100;
        }

        :host.fixed {
            position: fixed;
        }
    `]
})
export class OverlayComponent implements OnInit {
    private completeComponentCreation: () => void;

    positionFixed: boolean = false;
    left: number;
    top: number;


    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private changeDetector: ChangeDetectorRef) {
    }

    addComponent<T>(componentType: Type<any>, alignWith: ElementRef, alignment: Alignment): Promise<ComponentRef<T>> {
        return new Promise(resolve => {

            this.completeComponentCreation = () => {

                const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
                const component = this.container.createComponent(factory);
                this.alignContainer(alignWith, alignment);
                resolve(component);
            };
        });
    }

    ngOnInit(): void {
        if (this.completeComponentCreation) {
            this.completeComponentCreation();
        }
    }

    private alignContainer(targetRef: ElementRef, alignment: Alignment): void {
        const element: HTMLElement = this.elementRef.nativeElement;

        if (!element || (targetRef && !targetRef.nativeElement)) {
            return;
        }

        const elementRect = this.rectFromElement(element);

        const targetRect = targetRef ? this.rectFromElement(targetRef.nativeElement) : this.rectFromWindow();

        this.positionFixed = !targetRef;

        if (!elementRect || !targetRect) {
            return;
        }

        const newElementRect = position(elementRect, targetRect, null, alignment);

        const offsetLeft = element.offsetLeft + newElementRect.left - elementRect.left;
        const offsetTop = element.offsetTop + newElementRect.top - elementRect.top;

        this.left = offsetLeft;
        this.top = offsetTop;
    }

    private rectFromElement(element: HTMLElement): Rect {
        if (!element) {
            throw new Error("Element is undefined.");
        }

        let position: Point = {
            left: 0,
            top: 0
        };

        let current = element;

        do {
            position.left += current.offsetLeft;
            position.top += current.offsetTop;
            current = <HTMLElement>current.offsetParent;
        }
        while (current);


        return {
            left: position.left,
            top: position.top,
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }

    private rectFromWindow(): Rect {
        return {
            left: window.scrollX,
            top: window.scrollY,
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
}
