export default function (callback) {
    let ready = false;
    const getScriptUrl = () => {
        const scripts = document.getElementsByTagName('script');
        const element = scripts[scripts.length - 1];
        return element.src;
    };

    const parser = document.createElement('a');
    parser.href = getScriptUrl();

    const detach = function () {
        if (document.addEventListener) {
            document.removeEventListener('DOMContentLoaded', completed);
            window.removeEventListener('load', completed);
        } else {
            document.detachEvent('onreadystatechange', completed);
            window.detachEvent('onload', completed);
        }
    };
    const completed = function () {
        if (!ready && (document.addEventListener || event.type === 'load' || document.readyState === 'complete')) {
            ready = true;
            detach();
            callback(parser.origin);
        }
    };

    if (document.readyState === 'complete') {
        callback(parser.origin);
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', completed);
        window.addEventListener('load', completed);
    } else {
        document.attachEvent('onreadystatechange', completed);
        window.attachEvent('onload', completed);

        let top = false;

        try {
            top = window.frameElement == null && document.documentElement;
        } catch (e) {}

        if (top && top.doScroll) {
            (function scrollCheck() {
                if (ready) return;

                try {
                    top.doScroll('left');
                } catch (e) {
                    return setTimeout(scrollCheck, 50);
                }

                ready = true;
                detach();
                callback(parser.origin);
            })();
        }
    }
}
