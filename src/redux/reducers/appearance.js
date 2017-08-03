import { UPDATE_APPEARANCE } from '../constants/appearance';

const initialState = {
    largeContainer: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_APPEARANCE:
            return {...state, [action.payload.name]: action.payload.value}
    }
    return state;
}