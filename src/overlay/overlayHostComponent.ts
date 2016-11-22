import {
    Component, ComponentRef, ComponentFactoryResolver, OnInit, Type, ViewChild, ViewContainerRef,
    ChangeDetectorRef
} from "@angular/core";

import { OverlayComponent } from "./overlayComponent";
import { OverlayHost, OverlayService, PopupOptions } from "./overlayService";

@Component({
    selector: "overlay-host",
    template: "<template #container></template>",
    entryComponents: [OverlayComponent]
})
export class OverlayHostComponent implements OverlayHost, OnInit {

    @ViewChild("container", { read: ViewContainerRef }) container: ViewContainerRef;

    constructor(
        private overlayService: OverlayService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef
    ) {}

    openComponentInPopup<T>(componentType: Type<T>, options: PopupOptions): Promise<ComponentRef<T>> {
        return Promise.resolve(this.componentFactoryResolver
            .resolveComponentFactory<OverlayComponent>(OverlayComponent))
            .then(factory => this.container.createComponent(factory))
            .then((overlayRef: ComponentRef<OverlayComponent>) => {
                return overlayRef.instance
                    .addComponent<T>(componentType, options.alignWithElement, options.alignment)
                    .then(result => {
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
}
