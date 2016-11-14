# angular-io-datePicker

Customizable slimScroll directive for Angular 2.

## Code Example

#### [Demo](https://rd-dev-ukraine.github.io/angular-io-datepicker)

You'll need to add `SlimScroll` to your application module.

```typescript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SlimScroll,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
```

And then add `slimScroll` attribute with options to your element:

```html
<div slimScroll
     width="auto"
     height="250px"
     size="7px">
    Lorem ipsum dolor sit amet...   
 </div>
```

## Motivation

Existing slimScrolls do not work as they should... So we have written another one 😏

## Installation

````shell
npm i angular-io-datepicker --save
````

## API Reference

Options can be passed to an element via html attributes:

|Property          |Type   |Default         |Description                                                        |
| :--------------- | :---- | :------------- | :---------------------------------------------------------------- |
|`width`           |string |`auto`          |Width in pixels of the visible scroll area                         |
|`height`          |string |`250px`         |Height in pixels of the visible scroll area                        |
|`size`            |string |`7px`           |Width in pixels of the scrollbar and rail                          |
|`color`           |string |`#000`          |Scrollbar color, accepts any hex/color value                       |
|`position`        |string |`right`         |Scrollbar position - left/right                                    |
|`distance`        |string |`1px`           |Distance in pixels between the side edge and the scrollbar         |
|`start`           |string |`top`           |Default scroll position on load - top / bottom                     |
|`opacity`         |number |`.4`            |Sets scrollbar opacity                                             |
|`transition`      |number |`.3`            |Set transition for opacity in seconds                              |
|`alwaysVisible`   |boolean|`false`         |Enables always-on mode for the scrollbar                           |
|`disableFadeOut`  |boolean|`false`         |Check if we should hide the scrollbar when user is hovering over   |
|`railVisible`     |boolean|`false`         |Sets visibility of the rail                                        |
|`railColor`       |string |`#333`          |Sets rail color                                                    |
|`railOpacity`     |number |`.2`            |Sets rail opacity                                                  |
|`railClass`       |string |`slimScrollRail`|Defautlt CSS class of the slimscroll rail                          |
|`barClass`        |string |`slimScrollBar` |Defautlt CSS class of the slimscroll bar                           |
|`wrapperClass`    |string |`slimScrollDiv` |Defautlt CSS class of the slimscroll wrapper                       |
|`allowPageScroll` |boolean|`false`         |Check if mousewheel should scroll the window if we reach top/bottom|
|`wheelStep`       |number |`20`            |Scroll amount applied to each mouse wheel step                     |
|`touchScrollStep` |number |`200`           |Scroll amount when user is using gestures                          |
|`borderRadius`    |string |`7px`           |Sets border radius                                                 |
|`railBorderRadius`|string |`7px`           |Sets border radius of the rail                                     |
|`scrollTo`        |number |`0`             |Set default point from which to start scrolling                    |

## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/rd-dev-ukraine/angular-io-datepicker/blob/master/LICENSE) file for more info.