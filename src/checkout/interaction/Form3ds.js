import URITemplate from 'urijs/src/URITemplate';
import ParentCommunicator from '../../communication/ParentCommunicator';

export default class Form3ds {

    constructor(data, redirectUrl) {
        this.element = document.createElement('form');
        this.element.method = 'POST';
        this.element.action = data.uriTemplate;
        data.form.forEach(item => {
            const formParam = document.createElement('input');
            formParam.name = item.key;
            if (item.key === 'TermUrl') {
                const decoded = decodeURIComponent(item.template);
                const template = new URITemplate(decoded);
                formParam.value = template.expand({'termination_uri': redirectUrl});
            } else {
                formParam.value = item.template;
            }
            this.element.appendChild(formParam);
        });
        this.element.setAttribute('target', '_self');
    }

    render() {
        document.body.appendChild(this.element);
    }

    submit(timeout) {
        setTimeout(() => {
            ParentCommunicator.send({type: 'start3ds'});
            this.element.submit();
        }, timeout);
    }
}
