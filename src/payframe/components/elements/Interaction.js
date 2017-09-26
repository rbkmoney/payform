import React from 'react';
import URITemplate from 'urijs/src/URITemplate';

class Interaction extends React.Component {

    componentDidMount() {
        const frame = document.querySelector('#interactionFrame');
        const frameDocument = frame.contentWindow.document;
        const form = this.prepareForm(this.props.host, this.props.interactionData);
        frameDocument.body.appendChild(form);
        form.submit();
    }

    prepareForm(host, data) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action =  data.uriTemplate;
        data.form.forEach((item) => {
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
            form.appendChild(formParam);
        });
        form.setAttribute('target', '_self');
        form.style.visibility = 'hidden';
        return form;
    }

    render() {
        return (
            <div ref="3ds" className="payform--interact">
                <iframe id="interactionFrame">
                </iframe>
            </div>
        );
    }
}

export default Interaction;
