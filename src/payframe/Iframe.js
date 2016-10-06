export default class Iframe {
    constructor(src) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.style.zIndex = '9999';
        iframe.style.overflowX = 'hidden';
        iframe.style.overflowY = 'auto';
        iframe.style.visibility = 'hidden';
        iframe.style.border = '0';
        iframe.style.display = 'none';
        iframe.style.background = 'black';
        // iframe.style.opacity = '0.5';
        iframe.style.margin = '0px';
        iframe.style.padding = '0px';
        iframe.style.position = 'fixed';
        iframe.style.left = '0px';
        iframe.style.top = '0px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        document.body.appendChild(iframe);
        this.element = iframe;
    }

    show() {
        this.element.style.display = 'block';
        this.element.style.visibility = 'visible';
    }

    hide() {
        this.element.style.display = 'none';
        this.element.style.visibility = 'hidden';
    }
}
