const size = {
    mobile: 768
};

export const device = {
    desktop: `(min-width: ${size.mobile}px)`,
    mobile: `(max-width: ${size.mobile - 1}px)`
};
