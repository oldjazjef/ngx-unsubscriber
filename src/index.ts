import { Subject } from 'rxjs';

export interface IUnsubscribable {
    ngOnDestroy(): void;
}

export interface TUnsubscriber {
    new(...args: any[]): IUnsubscribable;
}

export function NgxUnsubscriber(): <T extends TUnsubscriber>(target: T) => T {
    return function decorator<T extends TUnsubscriber>(target: T): T {
        const ngOnDestroy = target.prototype.ngOnDestroy;
        if (ngOnDestroy == null) throw new Error('ngOnDestroy required');

        Object.defineProperty(target.prototype, 'unsubscribe$', {
            value: new Subject<void>()
        });

        Object.defineProperty(target.prototype, 'ngOnDestroy', {
            value: function () {
                const unsubscribe$: Subject<void> = target.prototype.unsubscribe$;
                unsubscribe$.next();
                return ngOnDestroy.apply(this, arguments);
            }
        });

        return class extends target {
        };
    }
}


export function Unsubscriber() {
    return function (constructor: any) {
        const orig = constructor.prototype.ngOnDestroy
        constructor.prototype.ngOnDestroy = function () {
            for (const prop in this) {
                const property = this[prop];
                if (typeof property.subscribe === "function") {
                    property.unsubscribe();
                }
            }
            orig?.apply();
        }
    }
}
