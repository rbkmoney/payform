export const calcHeight = (allMethodsCount: number, visibleCount: number, visibilityThreshold: number): number => {
    /**
     * 306 - 3 payment methods
     * 345 - 3 payment methods + link
     * 400 - 4 payment methods
     */
    if (allMethodsCount <= visibilityThreshold) {
        return 306;
    } else if (allMethodsCount > visibleCount) {
        return 345;
    } else {
        return 400;
    }
};
