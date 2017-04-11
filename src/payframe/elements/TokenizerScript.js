export default class TokenizerScript {

    constructor(tokenizerEndpoint) {
        const script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', `${tokenizerEndpoint}/tokenizer.js`);
        this.element = script;
    }

    render() {
        return new Promise((resolve, reject) => {
            document.getElementsByTagName('head')[0].appendChild(this.element);
            this.element.onload = () => resolve();
            this.element.onerror = () => reject({message: 'Tokenizer is not available'});
        });
    }
}
