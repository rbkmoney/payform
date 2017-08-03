import { UPDATE_APPEARANCE } from '../constants/appearance';

export function updateAppearance(name, value) {
    return {
        type: UPDATE_APPEARANCE,
        payload: {
            name,
            value
        }
    };
}