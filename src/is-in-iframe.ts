export const isInFrame = (): boolean => {
    try {
        return window.self === window.top;
    } catch (e) {
        return false;
    }
};
