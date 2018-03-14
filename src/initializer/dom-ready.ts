import { ieCurrentScriptStub } from '../ie-current-script-stub';

const getCurrentScript = (): HTMLScriptElement => {
    return (document.currentScript || ieCurrentScriptStub) as HTMLScriptElement;
};

export const domReady = (): Promise<string> => {
    const url = new URL(getCurrentScript().src);
    return new Promise((resolve) => {
        let ready = false;

        const detach = () => {
            if (document.addEventListener) {
                document.removeEventListener('DOMContentLoaded', completed);
                window.removeEventListener('load', completed);
            } else {
                (document as any).detachEvent('onreadystatechange', completed);
                (window as any).detachEvent('onload', completed);
            }
        };

        const completed = () => {
            if (!ready && (document.addEventListener || event.type === 'load' || document.readyState === 'complete')) {
                ready = true;
                detach();
                resolve(url.origin);
            }
        };

        if (document.readyState === 'complete') {
            resolve(url.origin);
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', completed);
            window.addEventListener('load', completed);
        } else {
            (document as any).attachEvent('onreadystatechange', completed);
            (window as any).attachEvent('onload', completed);
            let top: any = false;
            try {
                top = window.frameElement === null && document.documentElement;
                /* tslint:disable: no-empty */
            } catch (e) {
            }
            if (top && top.doScroll) {
                (function scrollCheck() {
                    if (ready) {
                        return;
                    }
                    try {
                        top.doScroll('left');
                    } catch (e) {
                        return setTimeout(scrollCheck, 50);
                    }
                    ready = true;
                    detach();
                    resolve(url.origin);
                })();
            }
        }
    });
};
