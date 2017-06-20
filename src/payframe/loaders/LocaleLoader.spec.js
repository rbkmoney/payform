import LocaleLoader from './LocaleLoader';

describe('LocaleLoader', function () {
    const enLocale = {
        "input.payment.cardNumber.placeholder": "Card number",
    };

    const ruLocale = {
        "input.payment.cardNumber.placeholder": "Номер карты",
    };

    beforeEach(function () {
        this.fetchStub = sinon.stub(window, 'fetch');
    });

    afterEach(function () {
        fetch.restore();
    });

    describe('#getAvailableLocale()', function() {
        it('should return en locale', function() {
            LocaleLoader.getAvailableLocale('en').should.be.equal('en');
        });

        it('should return ru locale', function() {
            LocaleLoader.getAvailableLocale('ru').should.be.equal('ru');
        });

        it('should return default locale when set unsupported locale', function() {
            LocaleLoader.getAvailableLocale('fr').should.be.equal('en');
        });
    });

    describe('#load()', function() {
        it('should be a promise', function () {
            LocaleLoader.load('en').should.to.be.a('promise');
        });

        it('should reject when call without params', function (done) {
            LocaleLoader.load().should.be.rejected.notify(done);
        });

        it('should return en locale', function (done) {
            const res = new Response(JSON.stringify(enLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            LocaleLoader.load('en')
                .should.become(enLocale).notify(done);
        });

        it('should return ru locale', function (done) {
            const res = new Response(JSON.stringify(ruLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            LocaleLoader.load('ru')
                .should.become(ruLocale).notify(done);
        });

        it('should return default locale when set unsupported locale', function (done) {
            const res = new Response(JSON.stringify(enLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            LocaleLoader.load('fr')
                .should.become(enLocale).notify(done);
        });
    });
});