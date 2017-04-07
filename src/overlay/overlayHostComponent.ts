import {
    Component, ComponentRef, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef, ElementRef
} from "@angular/core";

import { OverlayComponent } from "./overlayComponent";
import { OverlayHost, OverlayService, PopupOptions } from "./overlayService";

import { Alignment, Point, position, Rect } from "./positioning";

@Component({
    selector: "overlay-host",
    template: "<template #container></template>",
    entryComponents: [OverlayComponent]
})
export class OverlayHostComponent implements OverlayHost, OnInit {

    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private overlayService: OverlayService,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    openComponentInPopup<T>(componentType: Type<T>, options: PopupOptions): Promise<ComponentRef<T>> {
        return Promise.resolve(this.componentFactoryResolver
            .resolveComponentFactory<OverlayComponent>(OverlayComponent))
            .then(factory => this.container.createComponent(factory))
            .then((overlayRef: ComponentRef<OverlayComponent>) => {
                return overlayRef.instance
                    .addComponent<T>(componentType)
                    .then(result => {
                        this.alignContainer(overlayRef.instance, options.alignWithElement, options.alignment);
                        result.onDestroy(() => {
                            overlayRef.destroy();
                        });

                        const overlay = overlayRef.location.nativeElement;

                        if (options.closeOnClick) {

                            const closeOnClickHandler = (e: MouseEvent) => {
                                if (e.target && (<number>(<any>e.target)["nodeType"]) === 1) {
                                    const targetElement = <Element>e.target;
                                    if (!this.isDOMParent(targetElement, overlay)) {
                                        result.destroy();
                                        window.removeEventListener("mousedown", closeOnClickHandler);
                                    }
                                }
                            };

                            window.addEventListener("mousedown", closeOnClickHandler);
                        }

                        return result;
                    });
            });
    }

    ngOnInit(): void {
        this.overlayService.registerHost(this);
    }

    /**
     * Gets the value indicating whether @{parent} is direct or indirect parent node of the specified @{element}.
     */
    private isDOMParent(element: Element, parent: Element): boolean {
        if (!element) {
            throw new Error("Element is required.");
        }
        if (!parent) {
            throw new Error("Parent is required.");
        }

        if (element === parent) {
            return true;
        }

        if (!element.parentElement) {
            return false;
        }

        return this.isDOMParent(element.parentElement, parent);
    }

    private alignContainer(elRef: OverlayComponent, targetRef: ElementRef, alignment: Alignment): void {
        const element: HTMLElement = elRef.elementRef.nativeElement;

        if (!element || (targetRef && !targetRef.nativeElement)) {
            return;
        }
        const elementRect = this.rectFromElement(element);

        const targetRect = targetRef ? this.rectFromElement(targetRef.nativeElement) : this.rectFromWindow();

        elRef.positionFixed = !targetRef;

        if (!elementRect || !targetRect) {
            return;
        }

        const newElementRect = position(elementRect, targetRect, alignment);

        const offsetLeft = element.offsetLeft + newElementRect.left - elementRect.left;
        const offsetTop = element.offsetTop + newElementRect.top - elementRect.top;

        elRef.left = offsetLeft;
        elRef.top = offsetTop;
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
