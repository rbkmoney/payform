export default class Iframe {
    constructor(src, name) {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.setAttribute('name', name);
        iframe.style.zIndex = '9999';
        iframe.style.overflowX = 'hidden';
        iframe.style.overflowY = 'auto';
        iframe.style.visibility = 'hidden';
        iframe.style.border = '0';
        iframe.style.display = 'none';
        iframe.style.background = `rgba(${0},${0},${0},${0.00392157})`;
        iframe.style.margin = '0px';
        iframe.style.padding = '0px';
        iframe.style.position = 'fixed';
        iframe.style.left = '0px';
        iframe.style.top = '0px';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        this.element = iframe;
    }

    render() {
        document.body.appendChild(this.element);
    }

    destroy() {
        document.body.removeChild(this.element);
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
