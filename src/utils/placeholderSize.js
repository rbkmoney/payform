import settings from '../settings';

export default function(placeholder) {
    if (placeholder.length > 18) {
        return settings.smallPlaceholder
    } else {
        return settings.defaultPlaceholder
    }
}
