export const isInFrame = (): boolean => {
    try {
        return window.self === window.top; // TODO must be false
    } catch (e) {
        return false;
    }
};
