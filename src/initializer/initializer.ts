import { mapValues, isFunction } from 'lodash';
import * as isMobile from 'ismobilejs';

const mapBoolean = (obj: object): object => mapValues(obj, (value: any) => {
    switch (value) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return value;
    }
});

const getPopupMode = (userConfig: any) => isMobile.any || userConfig.popupMode === true;

const getLocale = (userConfig: any) => userConfig.locale || 'auto';

const prepareConfig = (userConfig: any): any => ({
    ...mapBoolean(userConfig),
    popupMode: getPopupMode(userConfig),
    locale: getLocale(userConfig)
});

/* tslint:disable: no-empty */
const dummyFn: ActionCallback = () => {};

type ActionCallback = () => void;

const initCallback = (fn: any): ActionCallback => isFunction(fn) ? fn : dummyFn;

export abstract class Initializer {

    protected config: any;
    protected origin: string;
    protected opened: ActionCallback;
    protected closed: ActionCallback;
    protected finished: ActionCallback;

    constructor(origin: string, userConfig: any) {
        this.config = prepareConfig(userConfig); // TODO fix it
        this.origin = origin;
        this.opened = initCallback(userConfig.opened);
        this.closed = initCallback(userConfig.closed);
        this.finished = initCallback(userConfig.finished);
    }

    abstract open(): void;

    abstract close(): void;
}
