import URITemplate from 'urijs/src/URITemplate';

export default class Form3ds {

    constructor(data, redirectUrl) {
        console.info('init 3ds form with params: ', data, redirectUrl);
        this.element = document.createElement('form');
        this.element.method = 'POST';
        this.element.action = data.uriTemplate;
        data.form.forEach(item => {
            const formParam = document.createElement('input');
            formParam.name = item.key;
            if (item.key === 'TermUrl') {
                const decoded = decodeURIComponent(item.template);
                const template = new URITemplate(decoded);
                formParam.value = template.expand({termination_uri: redirectUrl});
            } else {
                formParam.value = item.template;
            }
            this.element.appendChild(formParam);
        });
        this.element.setAttribute('target', '_self');
    }

    render() {
        console.info('render 3ds form');
        document.body.appendChild(this.element);
    }

    submit() {
        console.info('submit 3ds form');
        this.element.submit();
    }
}
