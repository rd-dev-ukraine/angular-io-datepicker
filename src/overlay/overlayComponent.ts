import {
    OnInit, Component, ComponentRef, ComponentFactoryResolver, ElementRef, Type, ViewChild, ViewContainerRef
} from "@angular/core";


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
        public elementRef: ElementRef
    ) {}

    addComponent<T>(componentType: Type<any>): Promise<ComponentRef<T>> {
        return new Promise(resolve => {

            this.completeComponentCreation = () => {
                const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
                const component = this.container.createComponent(factory);
                resolve(component);
            };
        });
    }

    ngOnInit(): void {
        if (this.completeComponentCreation) {
            this.completeComponentCreation();
        }
    }
}
