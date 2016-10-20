import ConfigLoader from '../loaders/ConfigLoader';

export default class TokenizerScript {
    constructor() {
        this.element = document.querySelector('#tokenizer');
        this.initSrc();
    }

    initSrc() {
        ConfigLoader.load().then(config => {
            this.element.src = `${config.tokenizerUrl}/tokenizer.min.js`;
        });
    }
}
