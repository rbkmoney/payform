// Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Safari UIWebView
let isSafariWebView = false;
if (navigator.platform.substr(0,2) === 'iP') {
    if (document.body.indexOf('tel:') == -1) {
        isSafariWebView = true;
    }
}

export default {
    isIE: isIE,
    isSafariWebView: isSafariWebView
};