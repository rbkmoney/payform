import { GET_LOCALE } from '../constants/locale';

export default function (state = null, action) {
    switch (action.type) {
        case GET_LOCALE:
            return action.payload;
    }
    return state;
}