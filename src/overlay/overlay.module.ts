import { NgModule } from "@angular/core";


import { OverlayService } from "./overlayService";
import { OverlayComponent } from "./overlayComponent";
import { OverlayHostComponent } from "./overlayHostComponent";


@NgModule({
    declarations: [
        OverlayComponent,
        OverlayHostComponent
    ],
    exports: [
        OverlayComponent,
        OverlayHostComponent
    ],
    providers: [
        OverlayService
    ],
    entryComponents: [
        OverlayComponent
    ]
})
export class OverlayModule { }
