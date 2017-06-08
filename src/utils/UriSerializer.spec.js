import UriSerializer from './UriSerializer';

describe('UriSerializer', function () {

    describe('#serialize()', function () {

        it('should return empty string when params is undefined', function () {
            UriSerializer.serialize().should.be.equal('');
        });

        it('should serialize blank field', function () {
            UriSerializer.serialize({
                blankField: ''
            }).should.be.equal('blankField=');
        });

        it('should serialize string field', function () {
            UriSerializer.serialize({
                stringField: 'value'
            }).should.be.equal('stringField=value');
        });

        it('should serialize number field', function () {
            UriSerializer.serialize({
                numberField: 1
            }).should.be.equal('numberField=1');
        });

        it('should serialize float field', function () {
            UriSerializer.serialize({
                numberField: 1.25
            }).should.be.equal('numberField=1.25');
        });

        it('should serialize boolean field', function () {
            UriSerializer.serialize({
                booleanField: true
            }).should.be.equal('booleanField=true');
        });

        it('should serialize url field', function () {
            UriSerializer.serialize({
                urlField: 'http://test.com/something?param=1&param=2'
            }).should.be.equal('urlField=http%3A%2F%2Ftest.com%2Fsomething%3Fparam%3D1%26param%3D2');
        });

        it('should serialize email field', function () {
            UriSerializer.serialize({
                emailField: 'test@test.com'
            }).should.be.equal('emailField=test%40test.com');
        });

        it('should serialize multi fields', function () {
            UriSerializer.serialize({
                stringField: 'value',
                emailField: 'test@test.com'
            }).should.be.equal('stringField=value&emailField=test%40test.com');
        });

        it('should not serialize undefined field', function () {
            UriSerializer.serialize({
                undefinedField: undefined
            }).should.be.equal('');
        });

        it('should not serialize function field', function () {
            UriSerializer.serialize({
                functionField: () => {},
            }).should.be.equal('');
        });

    });

    describe('#deserialize()', function () {

        it('should return empty object when url is undefined', function () {
            UriSerializer.deserialize().should.be.deep.equal({});
        });

        it('should return empty object when url is empty', function () {
            UriSerializer.deserialize('').should.be.deep.equal({});
        });

        it('should deserialize params with origin', function () {
            UriSerializer.deserialize('http://test.com?field=test').should.be.deep.equal({
                field: 'test'
            });
        });

        it('should deserialize blank field', function () {
            UriSerializer.deserialize('blankField=').should.be.deep.equal({
                blankField: ''
            });
        });

        it('should deserialize undefined field', function () {
            UriSerializer.deserialize('undefinedField=undefined').should.be.deep.equal({
                undefinedField: undefined
            });
        });

        it('should deserialize string field', function () {
            UriSerializer.deserialize('stringField=value').should.be.deep.equal({
                stringField: 'value'
            });
        });

        it('should deserialize number field', function () {
            UriSerializer.deserialize('numberField=1').should.be.deep.equal({
                numberField: 1
            });
        });

        it('should deserialize float field', function () {
            UriSerializer.deserialize('numberField=1.25').should.be.deep.equal({
                numberField: 1.25
            });
        });

        it('should deserialize boolean field', function () {
            UriSerializer.deserialize('booleanField=true').should.be.deep.equal({
                booleanField: true
            });
        });

        it('should deserialize url field', function () {
            UriSerializer.deserialize('urlField=http%3A%2F%2Ftest.com%2Fsomething%3Fparam%3D1%26param%3D2').should.be.deep.equal({
                urlField: 'http://test.com/something?param=1&param=2'
            });
        });

        it('should deserialize email field', function () {
            UriSerializer.deserialize('emailField=test%40test.com').should.be.deep.equal({
                emailField: 'test@test.com'
            });
        });

        it('should deserialize multi fields', function () {
            UriSerializer.deserialize('stringField=value&emailField=test%40test.com').should.be.deep.equal({
                stringField: 'value',
                emailField: 'test@test.com'
            });
        });
    });
});
