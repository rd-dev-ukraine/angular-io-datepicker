# angular-io-overlay

Overlay component that allows open a component in popup for Angular 2.

## Motivation

Existing popups do not work as they should... So we have written another one 😏

## Installation

````shell
npm i angular-io-overlay --save
````

## Code Example

#### [Demo](https://rd-dev-ukraine.github.io/angular-io-overlay/)

First of all you'll need to add `OverlayModule` to your application module.

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    OverlayModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
```

After that import `AlignType` and `OverlayService` to your component. 
Also we need `ElementRef`, `ComponentRef` and `ViewChild` from `@angular/core`.
And import your component that will be in popup.

```typescript
import { AlignType, OverlayService } from "../overlay";
import { ElementRef, ComponentRef, ViewChild } from "@angular/core";
import { ComponentThatShouldBeInPopup } from "./foobar";
```

Inject `OverlayService` in your constructor arguments like this.

```typescript
constructor(private overlayService: OverlayService) {}
```

Add a private property `_popupRef`.

```typescript
private _popupRef: ComponentRef<any>;
```

You will need to add a reference to the element that you will align with. Don't forget use it in your component constructor.

```angular2html
<div #alignWithContainer></div>
```

```typescript
@ViewChild("alignWithContainer") alignWithContainer: ElementRef;
```

Then add `overlay-host` element where is located your component to html.

```angular2html
<awesomeComponent></awesomeComponent>
<overlay-host></overlay-host>
```

And now you can use `OverlayService` in your code.

```typescript
this.overlayService.openComponentInPopup<ComponentThatShouldBeInPopup>(
            ComponentThatShouldBeInPopup, {
                alignWithElement: this.alignWithContainer,
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
        });
```

## API Reference

|Property          |Type      |Default    |Description                                                |
| :--------------- | :------- | :-------- | :-------------------------------------------------------- |
|`alignWithElement`|ElementRef|`undefined`|Reference to the element that popup will align with        |
|`alignment`       |Alignment |`defaultAlign: Alignment = {element: {horizontal: AlignType.Left,vertical: AlignType.Top},target: {horizontal: AlignType.Left,vertical: AlignType.Bottom}};`|Align element(Popup) with target(`this.alignWithContainer`)|
|`closeOnClick`    |boolean   |`true`     |Close popup and destroy thn component on click out of popup|


## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/rd-dev-ukraine/angular-io-overlay/blob/master/LICENSE) file for more info.