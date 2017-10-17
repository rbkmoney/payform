const integration = [
    {
        name: 'invoiceAccessToken',
        isRequired: true
    },
    {
        name: 'invoiceID',
        isRequired: true
    },
    {
        name: 'invoiceTemplateID',
        isRequired: true
    },
    {
        name: 'invoiceTemplateAccessToken',
        isRequired: true
    },
    {
        name: 'customerID',
        isRequired: true
    },
    {
        name: 'customerAccessToken',
        isRequired: true
    },
    {
        name: 'email'
    },
    {
        name: 'logo'
    },
    {
        name: 'name'
    },
    {
        name: 'label'
    },
    {
        name: 'description'
    },
    {
        name: 'payButtonLabel'
    },
    {
        name: 'popupMode'
    },
    {
        name: 'redirectUrl'
    },
    {
        name: 'locale'
    },
    {
        name: 'opened'
    },
    {
        name: 'closed'
    },
    {
        name: 'finished'
    },
    {
        name: 'applePayTest'
    },
    {
        name: 'paymentFlowHold',
    },
    {
        name: 'holdExpiration'
    },
    {
        name: 'terminals'
    }
];

const integrationTypes = [
    {
        name: 'default',
        fields: ['invoiceID', 'invoiceAccessToken']
    }, {
        name: 'template',
        fields: ['invoiceTemplateID', 'invoiceTemplateAccessToken']
    }, {
        name: 'customer',
        fields: ['customerID', 'customerAccessToken']
    }
];

export {
    integration,
    integrationTypes
};
