import { SET_ERROR } from '../constants/error';

export default function (state = null, action) {
    switch (action.type) {
        case SET_ERROR:
            return {...state, message: action.payload.message};
    }
    return state;
}