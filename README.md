
# ngx-unsubscriber

Library to auto unsubscribe observables/subscriptions.
Offers two class decorators:
1. NgxUnsubscriber() - Angular
2. Unsubscriber() - TS


### How to use

#### NgxUnsubscriber()
This decorator is used with Angular components.
The decorator forces you to implement the interface IUnsubscribable.
This way we make sure to implement ngOnDestory which is needed in case of AOT compilation.

On ngOnDestory the decorator iterates all properties of the component and checks
if the current property is subscribable.
Subscribable properties are then unsubscribed.

```typescript
@NgxUnsubscriber()
@Component(...)
export class MyComponent implements IUnsubscribable {

    prop1$: Observable<void>...
    prop2$: Observable<void>...

    ngOnDestory(): void {} // Needed for AOT compilation eventhough it is empty 
}
```

#### Unsubscriber()
The decorator iterates all properties of a class and checks
if the current property is subscribable.
Subscribable properties are then unsubscribed.

```typescript
@Unsubscriber()
export class MyClass {

    prop1$: Observable<void>...
    prop2$: Observable<void>...
    
}
```

