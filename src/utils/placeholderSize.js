import settings from '../settings';

export default function(placeholder) {
    if (placeholder.length > 8) {
        return settings.smallPlaceholder
    } else {
        return settings.defaultPlaceholder
    }
}
