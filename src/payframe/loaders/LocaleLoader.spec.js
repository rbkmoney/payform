import LocaleLoader from './LocaleLoader';

describe('LocaleLoader', function () {

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

        it('should return en locale', function() {
            //Here this method should return default locale 'en' if you pass locale which do not have dictionary
            //Now we have only 'ru' and 'en' locale
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
            const enLocale = {
                "input.payment.cardNumber.placeholder": "Card number",
                "input.payment.cardExpiry.placeholder": "MM / YY",
                "input.payment.cardCVV.placeholder": "CVV",
                "input.payment.cardHolder.placeholder": "Card holder",
                "input.payment.email.placeholder": "Email",
                "button.help": "Support"
            };

            const res = new Response(JSON.stringify(enLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            LocaleLoader.load('en')
                .should.notify(done);
        });

        it('should return ru locale', function (done) {
            const enLocale = {
                "input.payment.cardNumber.placeholder": "Номер карты",
                "input.payment.cardExpiry.placeholder": "ММ / ГГ",
                "input.payment.cardCVV.placeholder": "CVV",
                "input.payment.cardHolder.placeholder": "Имя на карте",
                "input.payment.email.placeholder": "Email",
                "button.help": "Помощь"
            };

            const res = new Response(JSON.stringify(enLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            LocaleLoader.load('ru')
                .should.notify(done);
        });

        it('should return en locale', function (done) {
            const enLocale = {
                "input.payment.cardNumber.placeholder": "Card number",
                "input.payment.cardExpiry.placeholder": "MM / YY",
                "input.payment.cardCVV.placeholder": "CVV",
                "input.payment.cardHolder.placeholder": "Card holder",
                "input.payment.email.placeholder": "Email",
                "button.help": "Support"
            };

            const res = new Response(JSON.stringify(enLocale), {status: 200});
            fetch.returns(Promise.resolve(res));

            //Here this method should return default locale 'en' if you pass locale which do not have dictionary
            //Now we have only 'ru' and 'en' locale
            LocaleLoader.load('fr')
                .should.notify(done);
        });
    });
});