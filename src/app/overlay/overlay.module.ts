import { NgModule } from "@angular/core";


import { OverlayService, OverlayHostComponent, OverlayComponent } from "./index";


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
