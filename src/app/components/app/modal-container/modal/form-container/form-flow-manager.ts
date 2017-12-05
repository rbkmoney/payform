import { FormFlowItem, FormName } from 'checkout/state';

export const add = (f: FormFlowItem[], formName: FormName): FormFlowItem[] => {
    if (!f) {
        return f;
    }
    const result = f.slice();
    result.push({formName, active: false});
    return result;
};

export const init = (f: FormFlowItem[]): FormFlowItem[] => {
    if (!f || f.length === 0) {
        return f;
    }
    const result = f.slice();
    result[0].active = true;
    return result;
};

export const hasNext = (f: FormFlowItem[]): boolean => {
    if (!f || f.length < 2) {
        return false;
    }
    return f.indexOf(getActive(f)) !== f.length - 1;
};

export const next = (f: FormFlowItem[]): FormFlowItem[] => {
    if (!f || !hasNext(f)) {
        return f;
    }
    const i = f.indexOf(getActive(f));
    const result = f.slice();
    result[i].active = false;
    result[i + 1].active = true;
    return result;
};

export const hasBack = (f: FormFlowItem[]): boolean => {
    if (!f || f.length < 2) {
        return false;
    }
    return f.indexOf(getActive(f)) !== 0;
};

export const back = (f: FormFlowItem[]): FormFlowItem[] => {
    if (!f || !hasBack(f)) {
        return f;
    }
    const i = f.indexOf(getActive(f));
    const result = f.slice();
    result[i].active = false;
    result[i - 1].active = true;
    return result;
};

export const getActive = (f: FormFlowItem[]): FormFlowItem => f.find((item) => item.active);
