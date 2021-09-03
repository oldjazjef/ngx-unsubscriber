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

        Object.defineProperty(target.prototype, 'ngOnDestroy', {
            value: function () {
                unsubscribe(this);
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
            unsubscribe(this);
            orig?.apply();
        }
    }
}

function unsubscribe(container: any): void {
    for (const prop in container) {
        const property = container[prop];
        if (typeof property.subscribe === "function") {
            property.unsubscribe();
        }
    }
}
