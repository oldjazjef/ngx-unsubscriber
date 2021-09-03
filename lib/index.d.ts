export interface IUnsubscribable {
    ngOnDestroy(): void;
}
export interface TUnsubscriber {
    new (...args: any[]): IUnsubscribable;
}
export declare function NgxUnsubscriber(): <T extends TUnsubscriber>(target: T) => T;
export declare function Unsubscriber(): (constructor: any) => void;
