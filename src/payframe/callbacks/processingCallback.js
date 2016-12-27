export default function (endpointUrl) {
    if (endpointUrl) {
        const callbackForm = document.createElement('form');
        callbackForm.method = 'POST';
        callbackForm.action = endpointUrl;
        callbackForm.setAttribute('target', '_top');
        callbackForm.submit();
    }
}
