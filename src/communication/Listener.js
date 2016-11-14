export default class Listener {

    static addListener(callback) {
        window.addEventListener('message', event => {
            try {
                const parsed = JSON.parse(event.data);
                callback(parsed);
            } catch (e) {}
        }, false);
    }
}
