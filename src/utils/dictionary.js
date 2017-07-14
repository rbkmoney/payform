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
    }
];

const integrationTypes = [
    {
        name: 'default',
        fields: ['invoiceID', 'invoiceAccessToken']
    }, {
        name: 'template',
        fields: ['invoiceTemplateID']
    }
];

export {
    integration,
    integrationTypes
};
