export default function (endpointUrl, method) {
    if (method !== 'GET') {
        method = 'POST';
    }
     if (endpointUrl) {
        const callbackForm = document.createElement('form');
        callbackForm.method = method;
        callbackForm.action = endpointUrl;
        callbackForm.setAttribute('target', '_top');
        document.body.appendChild(callbackForm);
        callbackForm.submit();
    }
}
