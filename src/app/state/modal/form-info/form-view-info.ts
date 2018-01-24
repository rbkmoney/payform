export enum SlideDirection {
    right = 'slideRightAnimation',
    left = 'slideLeftAnimation'
}

export interface FormViewInfo {
    slideDirection: SlideDirection;
    height?: number;
    error?: boolean;
    inProcess?: boolean;
}
