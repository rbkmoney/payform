// Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Safari UIWebView
const isSafariWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/i.test(navigator.userAgent);

export default {
    isIE: isIE,
    isSafariWebView: isSafariWebView
};