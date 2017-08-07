import { SET_STATUS } from '../constants/payment';

const initialState = {
    status: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_STATUS:
            return {
                ...state,
                status: action.payload.status
            };
    }
    return state;
}
