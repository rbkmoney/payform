export default class Listener {

    static addListener(callback) {
        window.addEventListener('message', event => {
            const parsed = JSON.parse(event.data);
            callback(parsed);
        }, false);
    }
}
