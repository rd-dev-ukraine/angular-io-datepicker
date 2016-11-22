import { ComponentRef, ElementRef, Injectable, Type } from "@angular/core";

import { Alignment, AlignType } from "./positioning";


export interface PopupOptions {
    alignWithElement?: ElementRef;
    alignment?: Alignment;
    closeOnClick?: boolean;
}


export interface OverlayHost {
    openComponentInPopup<T>(componentType: Type<T>, options: PopupOptions): Promise<ComponentRef<T>>;
}


/** Adds components in overlay to the HTML tree at position specified by `overlay-host` component. */
@Injectable()
export class OverlayService {
    private host: OverlayHost;

    registerHost(hostComponent: OverlayHost): void {
        this.host = hostComponent;
    }

    openComponentInPopup<T>(componentType: Type<any>, options?: PopupOptions): Promise<ComponentRef<T>> {
        if (!this.host) {
            throw new Error("Host is not registered");
        }

        const opt: PopupOptions = {
            alignWithElement: null,
            alignment: {
                element: {
                    horizontal: AlignType.Center,
                    vertical: AlignType.Center
                },
                target: {
                    horizontal: AlignType.Center,
                    vertical: AlignType.Center
                }
            },
            closeOnClick: false
        };

        if (options) {
            opt.alignWithElement = options.alignWithElement || opt.alignWithElement;
            opt.alignment = options.alignment || opt.alignment;
            if (options.closeOnClick !== null && options.closeOnClick !== undefined) {
                opt.closeOnClick = options.closeOnClick;
            }
        }

        return this.host.openComponentInPopup<T>(componentType, opt);
    }
}
