export default function(placeholder) {
    if (placeholder.length > 18) {
        return 'small-placeholder';
    } else {
        return 'default-placeholder';
    }
}
