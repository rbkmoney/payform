export const ieCurrentScriptStub = {
    src: 'https://checkout.rbk.money/checkout.js'
};

const getCurrentScript = (): HTMLScriptElement =>
    (document.currentScript || ieCurrentScriptStub) as HTMLScriptElement;

export const getOrigin = (): string =>
    new URL(getCurrentScript().src).origin;
