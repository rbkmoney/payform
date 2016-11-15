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
        return new Promise((resolve, error) => {
            document.getElementsByTagName('head')[0].appendChild(this.element);
            this.element.onload = () => resolve();
            this.element.onerror = () => error();
        });
    }
}
