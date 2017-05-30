// Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Safari UIWebView
let isSafariWebView = false;
if (navigator.platform.substr(0,2) === 'iP') {
    if (document.querySelectorAll('a[href="tel:111-111-1111"]').length !== 1) {
        isSafariWebView = true;
    }
}

export default {
    isIE: isIE,
    isSafariWebView: isSafariWebView
};
