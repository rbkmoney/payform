import CheckIntegration from './CheckIntegration';

describe('CheckIntegration', function () {
    describe('#makeDictionary()', function() {
        it('should return dictionary for matcher', function() {
            const dictionary = 'invoiceAccessToken invoiceID logo name label description payButtonLabel popupMode opened closed finished ';

            CheckIntegration.makeDictionary().should.be.equal(dictionary);
        });
    });

    describe('#check()', function() {
        it('should return true', function() {
            const props = {
                invoiceID: 'qzO2i1fZqK',
                invoiceAccessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2N1BsaUREb0JaM2RBb3ViSDhwYkZwaUw0cEFFWG9mRGZoSFRJcnNxZ0kiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6Im1lcmNoYW50QGl0cy5kZW1vIiwiZXhwIjoxNDk2NDA3ODE3LCJqdGkiOiJxek8yaUd6dXJvIiwibmFtZSI6IkRlbW8gTWVyY2hhbnQiLCJyZXNvdXJjZV9hY2Nlc3MiOnsiY29tbW9uLWFwaSI6eyJyb2xlcyI6WyJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOnJlYWQiLCJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOndyaXRlIiwiaW52b2ljZXMucXpPMmkxZlpxSzpyZWFkIiwicGF5bWVudF90b29sX3Rva2Vuczp3cml0ZSJdfX0sInN1YiI6IjI4MTIyMGViLWE0ZWYtNGQwMy1iNjY2LWJkZWM0YjI2YzVmNyJ9.BdgXghv9jhsrtWPLJTDkK_fqcxEj_etLgnelyuRtSHwxLN9prOsHA_cKt34IdW7S5-39gNwQrdMveGDgZrGlrwQVmSOhWoCcfDcGmqGEyCHsOtYq5KIwv0wQkVRjfUifHzcP39AMRAKJVlvpG5wBMfkJ425krE-D3KYT_zLeZTn-yA0u_zMRhBe_er_vXXlXL1N-FWqJq7bE7d1cTRDjblo9NYU4nHTbw8C5byyrdozjE2a3jkgFyw6aEwk_pKun1L3J90TZHZsMMyeU78CXMZ7AF3M6mQ7_PclpjKKQZJA9N4v_vxf86WW7zJXRmHwBpK_VxnZTehgobXk3ngQFnQ',
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

        it('should return false', function() {
            const props = {
                invoiceID: 'qzO2i1fZqK',
                invoiceAccessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUdEZzelc3NDB2NTQ1MThVUVg1MGNnczN1U2pCSXkxbDdGcDVyMHdmYzFrIn0.eyJqdGkiOiIyMjExZTMyZC01NGM0LTRlNTEtOTNkYy1jNDNkM2ExOTczNDgiLCJleHAiOjE1Mjc4NjQwMTQsIm5iZiI6MCwiaWF0IjoxNDk2MzI4MDE0LCJpc3MiOiJodHRwOi8vYXV0aC5yYmsudGVzdDo4MDgwL2F1dGgvcmVhbG1zL2V4dGVybmFsIiwiYXVkIjoia29mZmluZyIsInN1YiI6IjZlMjIyOWU3LTEzOTItNGJhZi04NTdhLWJkYWUyNDU2YWYxMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtvZmZpbmciLCJub25jZSI6IjljMGExZmJlLTJhYjEtNDg0Ny04YmMyLWQ5NjMyZjBhM2JmZCIsImF1dGhfdGltZSI6MTQ5NjMyODAxMywic2Vzc2lvbl9zdGF0ZSI6IjgzYTllZjIyLTdiYTktNGYzMC1hMDNiLWYxMGE4YTExMWRjYSIsImFjciI6IjEiLCJjbGllbnRfc2Vzc2lvbiI6ImEwMGFhZWM3LWY2NjMtNDkxYS1hZDk3LWM3NmE1ZjQ2YmM0NyIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vZGFzaGJvYXJkLnJiay50ZXN0OjgwODAiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImNvbW1vbi1hcGkiOnsicm9sZXMiOlsicGFydHk6cmVhZCIsInBhcnR5OndyaXRlIiwiaW52b2ljZXM6cmVhZCIsImludm9pY2VzOndyaXRlIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6ImxhQG1lLmNvbSBsYUBtZS5jb20iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsYUBtZS5jb20iLCJnaXZlbl9uYW1lIjoibGFAbWUuY29tIiwiZmFtaWx5X25hbWUiOiJsYUBtZS5jb20iLCJlbWFpbCI6ImxhQG1lLmNvbSJ9.nPUzQajh8dB4zJPwc99mk6SdZsIaOlpc9rNYU-09UZeNtTMsVIEhMv2lxFZHJ_gfoLe2t8Y-itZ7PK9etqvuN50QAbxWhVhnHeMeYqBI6IPud88DBlVwx0FYieHhgljp0_3TlzWXF4zij5HQ8AxS3n1-VGRvga407CfnQc_jl7ngEc7pMsfN-sN7iCJky7w3pp8uick3lVLL0nW4JNrzq8mOknnX3xMPxK6MYpa6WzUFVyNME-w656kmzqBb4Qgf4fS88qY4zSE2rwjkLJa8fdACV42o6oqVwYYgHk2-kU77-598CX9FQC1X5_e_9-Ad4V9kgdfghbIyjA2FpRB2Kw',
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

            CheckIntegration.check(props).should.be.equal(false);
        })
    });

    describe('#checkToken()', function() {
        it('should return true', function() {
            const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2N1BsaUREb0JaM2RBb3ViSDhwYkZwaUw0cEFFWG9mRGZoSFRJcnNxZ0kiLCJ0eXAiOiJKV1QifQ.eyJlbWFpbCI6Im1lcmNoYW50QGl0cy5kZW1vIiwiZXhwIjoxNDk2NDA3ODE3LCJqdGkiOiJxek8yaUd6dXJvIiwibmFtZSI6IkRlbW8gTWVyY2hhbnQiLCJyZXNvdXJjZV9hY2Nlc3MiOnsiY29tbW9uLWFwaSI6eyJyb2xlcyI6WyJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOnJlYWQiLCJpbnZvaWNlcy5xek8yaTFmWnFLLnBheW1lbnRzOndyaXRlIiwiaW52b2ljZXMucXpPMmkxZlpxSzpyZWFkIiwicGF5bWVudF90b29sX3Rva2Vuczp3cml0ZSJdfX0sInN1YiI6IjI4MTIyMGViLWE0ZWYtNGQwMy1iNjY2LWJkZWM0YjI2YzVmNyJ9.BdgXghv9jhsrtWPLJTDkK_fqcxEj_etLgnelyuRtSHwxLN9prOsHA_cKt34IdW7S5-39gNwQrdMveGDgZrGlrwQVmSOhWoCcfDcGmqGEyCHsOtYq5KIwv0wQkVRjfUifHzcP39AMRAKJVlvpG5wBMfkJ425krE-D3KYT_zLeZTn-yA0u_zMRhBe_er_vXXlXL1N-FWqJq7bE7d1cTRDjblo9NYU4nHTbw8C5byyrdozjE2a3jkgFyw6aEwk_pKun1L3J90TZHZsMMyeU78CXMZ7AF3M6mQ7_PclpjKKQZJA9N4v_vxf86WW7zJXRmHwBpK_VxnZTehgobXk3ngQFnQ';
            const invoiceID = 'qzO2i1fZqK';

            CheckIntegration.checkToken(token, invoiceID).should.be.deep.equal(true);
        });

        it('should return false', function() {
            const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUdEZzelc3NDB2NTQ1MThVUVg1MGNnczN1U2pCSXkxbDdGcDVyMHdmYzFrIn0.eyJqdGkiOiIyMjExZTMyZC01NGM0LTRlNTEtOTNkYy1jNDNkM2ExOTczNDgiLCJleHAiOjE1Mjc4NjQwMTQsIm5iZiI6MCwiaWF0IjoxNDk2MzI4MDE0LCJpc3MiOiJodHRwOi8vYXV0aC5yYmsudGVzdDo4MDgwL2F1dGgvcmVhbG1zL2V4dGVybmFsIiwiYXVkIjoia29mZmluZyIsInN1YiI6IjZlMjIyOWU3LTEzOTItNGJhZi04NTdhLWJkYWUyNDU2YWYxMiIsInR5cCI6IkJlYXJlciIsImF6cCI6ImtvZmZpbmciLCJub25jZSI6IjljMGExZmJlLTJhYjEtNDg0Ny04YmMyLWQ5NjMyZjBhM2JmZCIsImF1dGhfdGltZSI6MTQ5NjMyODAxMywic2Vzc2lvbl9zdGF0ZSI6IjgzYTllZjIyLTdiYTktNGYzMC1hMDNiLWYxMGE4YTExMWRjYSIsImFjciI6IjEiLCJjbGllbnRfc2Vzc2lvbiI6ImEwMGFhZWM3LWY2NjMtNDkxYS1hZDk3LWM3NmE1ZjQ2YmM0NyIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vZGFzaGJvYXJkLnJiay50ZXN0OjgwODAiXSwicmVzb3VyY2VfYWNjZXNzIjp7ImNvbW1vbi1hcGkiOnsicm9sZXMiOlsicGFydHk6cmVhZCIsInBhcnR5OndyaXRlIiwiaW52b2ljZXM6cmVhZCIsImludm9pY2VzOndyaXRlIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwibmFtZSI6ImxhQG1lLmNvbSBsYUBtZS5jb20iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJsYUBtZS5jb20iLCJnaXZlbl9uYW1lIjoibGFAbWUuY29tIiwiZmFtaWx5X25hbWUiOiJsYUBtZS5jb20iLCJlbWFpbCI6ImxhQG1lLmNvbSJ9.nPUzQajh8dB4zJPwc99mk6SdZsIaOlpc9rNYU-09UZeNtTMsVIEhMv2lxFZHJ_gfoLe2t8Y-itZ7PK9etqvuN50QAbxWhVhnHeMeYqBI6IPud88DBlVwx0FYieHhgljp0_3TlzWXF4zij5HQ8AxS3n1-VGRvga407CfnQc_jl7ngEc7pMsfN-sN7iCJky7w3pp8uick3lVLL0nW4JNrzq8mOknnX3xMPxK6MYpa6WzUFVyNME-w656kmzqBb4Qgf4fS88qY4zSE2rwjkLJa8fdACV42o6oqVwYYgHk2-kU77-598CX9FQC1X5_e_9-Ad4V9kgdfghbIyjA2FpRB2Kw';
            const invoiceID = 'qzO2i1fZqK';

            CheckIntegration.checkToken(token, invoiceID).should.be.equal(false);
        })
    });
});