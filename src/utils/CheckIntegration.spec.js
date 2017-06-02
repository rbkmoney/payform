import CheckIntegration from './CheckIntegration';

describe('CheckIntegration', function () {
    const invoiceID = 'qzO2i1fZqK';
    /*
    ...
    "resource_access": {
        "common-api": {
            "roles": [
                "invoices.qzO2i1fZqK.payments:read",
                "invoices.qzO2i1fZqK.payments:write",
                "invoices.qzO2i1fZqK:read",
                "payment_tool_tokens:write"
            ]
        }
    }
    ...
    */
    const accessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2N1BsaUREb0JaM2RBb3ViSDhwYkZwaUw0cEFFWG9mRGZoSFRJcnNxZ0kiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6Im1lcmNoYW50QGl0cy5kZW1vIiwiZXhwIjoxNDk2NDA3ODE3LCJqdGkiOiJxek8yaUd6dXJvIiwibmFtZSI6IkRlbW8gTWVyY2hhbnQiLCJyZXNvdXJjZV9hY2Nlc3MiOnsiY29tbW9uLWFwaSI6eyJyb2xlcyI6WyJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOnJlYWQiLCJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOndyaXRlIiwiaW52b2ljZXMucXpPMmkxZlpxSzpyZWFkIiwicGF5bWVudF90b29sX3Rva2Vuczp3cml0ZSJdfX0sInN1YiI6IjI4MTIyMGViLWE0ZWYtNGQwMy1iNjY2LWJkZWM0YjI2YzVmNyJ9.BdgXghv9jhsrtWPLJTDkK_fqcxEj_etLgnelyuRtSHwxLN9prOsHA_cKt34IdW7S5-39gNwQrdMveGDgZrGlrwQVmSOhWoCcfDcGmqGEyCHsOtYq5KIwv0wQkVRjfUifHzcP39AMRAKJVlvpG5wBMfkJ425krE-D3KYT_zLeZTn-yA0u_zMRhBe_er_vXXlXL1N-FWqJq7bE7d1cTRDjblo9NYU4nHTbw8C5byyrdozjE2a3jkgFyw6aEwk_pKun1L3J90TZHZsMMyeU78CXMZ7AF3M6mQ7_PclpjKKQZJA9N4v_vxf86WW7zJXRmHwBpK_VxnZTehgobXk3ngQFnQ';

    describe('#makeDictionary()', function() {
        it('should return dictionary for matcher', function() {
            const dictionary = 'invoiceAccessToken invoiceID logo name label description payButtonLabel popupMode opened closed finished ';

            CheckIntegration.makeDictionary().should.be.equal(dictionary);
        });
    });

    describe('#check()', function() {
        it('should return true', function() {
            const props = {
                invoiceID: invoiceID,
                invoiceAccessToken: accessToken,
                name: 'Some company',
                payButtonLabel: 'Pay',
                popupMode: false,
                opened: function() {
                    console.log('Checkout on opened');
                },
                closed: function() {
                    console.log('Checkout on closed');
                },
                finished: function() {
                    location.reload();
                }
            };

            CheckIntegration.check(props).should.be.equal(true);
        });
    });
});