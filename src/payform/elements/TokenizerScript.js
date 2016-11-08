import ConfigLoader from '../loaders/ConfigLoader';

export default class TokenizerScript {
    constructor() {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        ConfigLoader.load().then(config => {
            script.setAttribute('src', `${config.tokenizerUrl}/tokenizer.min.js`);
        });
        this.element = script;
    }

    render() {
        document.getElementsByTagName('head')[0].appendChild(this.element);
    }
}
