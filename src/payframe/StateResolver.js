import UriSerializer from '../utils/UriSerializer';

export default class StateResolver {

    static resolve(transport) {
        return new Promise((resolve) => {
            if (this.isSearchParamsState()) {
                return resolve(UriSerializer.deserialize(location.search));
            } else {
                transport.on('init-payform', (state) => {
                    return resolve(state);
                });
            }
        });
    }

    static isSearchParamsState() {
        return !!location.search;
    }
}
