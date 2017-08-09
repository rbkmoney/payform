import { SET_ERROR } from '../constants/error';

export default function (state = null, action) {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                localePath: action.payload.localePath
            };
    }
    console.log(action);
    return state;
}
