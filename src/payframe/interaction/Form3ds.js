import URITemplate from 'urijs/src/URITemplate';

export default class Form3ds {

    constructor(data, host, body) {
        this.container = document.createElement('iframe');
        body.appendChild(this.container);
        const containerDoc = this.container.contentWindow.document;
        containerDoc.open();
        containerDoc.write('<html><body></body></html>');
        containerDoc.close();
        this.element = document.createElement('form');
        this.element.method = 'POST';
        this.element.action = data.uriTemplate;
        data.form.forEach(item => {
            const formParam = document.createElement('input');
            formParam.name = item.key;
            if (item.key === 'TermUrl') {
                const decoded = decodeURIComponent(item.template);
                const template = new URITemplate(decoded);
                const redirectUrl = `${host}/html/finishInteraction.html`;
                formParam.value = template.expand({'termination_uri': redirectUrl});
            } else {
                formParam.value = item.template;
            }
            this.element.appendChild(formParam);
        });
        this.element.setAttribute('target', '_self');
        this.element.style.visibility = 'hidden';
        containerDoc.body.appendChild(this.element);
    }

    submit(timeout) {
        // TODO fix it
        setTimeout(() => {
            this.element.submit();
        }, timeout);
    }
}
