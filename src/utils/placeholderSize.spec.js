import placeholderSize from './placeholderSize';

describe('placeholderSize()', function() {
    it('should return small-placeholder classname', () => {
        placeholderSize('01234567890123456789').should.to.equal('small-placeholder');
    });

    it('should return default-placeholder classname', () => {
        placeholderSize('0123456').should.to.equal('default-placeholder');
    })
});