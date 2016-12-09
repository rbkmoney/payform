export default function (endpointUrl, invoiceId) {
    fetch(`${endpointUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({invoiceId})
    });
}
