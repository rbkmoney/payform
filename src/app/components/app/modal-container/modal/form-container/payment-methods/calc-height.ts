export const calcHeight = (allMethodsCount: number, visibleCount: number, visibilityThreshold: number): number => {
    /**
     * 306 - 3 payment methods
     * 345 - 3 payment methods + link
     * 400 - 4 payment methods
     * 494 - 5 payment methods
     */
    if (allMethodsCount <= visibilityThreshold) {
        return 306;
    } else if (allMethodsCount > visibleCount) {
        return 345;
    } else if (allMethodsCount === 4) {
        return 400;
    } else {
        return 494;
    }
};
