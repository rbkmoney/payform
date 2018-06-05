export const getScript = (src: string): Promise<void> => {
    return new Promise((resolve) => {
        const el = document.createElement('script');
        el.type = 'text/javascript';
        el.async = false;
        el.src = src;
        if (typeof el.addEventListener !== 'undefined') {
            el.addEventListener('load', () => resolve(), false);
        }
        const firstScriptEl = document.getElementsByTagName('script')[0];
        firstScriptEl.parentNode.insertBefore(el, firstScriptEl);
    });
};
