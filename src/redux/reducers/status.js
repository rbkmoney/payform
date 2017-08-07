import { SET_STATUS } from '../constants/status';

export default function (status = 'process', action) {
    switch (action.type) {
        case SET_STATUS:
            return action.payload;
    }
    return status;
}