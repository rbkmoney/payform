import { SET_RESULT } from '../constants/result';

export default function (state = null, action) {
    switch (action.type) {
        case SET_RESULT:
            return action.payload;
    }
    return state;
}
