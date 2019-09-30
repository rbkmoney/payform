import { isContainCardNumber } from './is-contain-card-number';

describe('isContainCardNumber', () => {
    const validCardNumber = '4242424242424242';
    const invalidCardNumber = '4242424242424243';
    const splitValidCardNumber = '4242 4242 4242 4242';

    it('should true for valid card number', () => {
        expect(isContainCardNumber(validCardNumber)).toBeTruthy();
    });

    it('should true for split valid card number', () => {
        expect(isContainCardNumber(splitValidCardNumber)).toBeTruthy();
    });

    it('should true for split with words valid card number', () => {
        expect(isContainCardNumber(splitValidCardNumber.replace(' ', 'test-string'))).toBeTruthy();
    });

    it('should true for start/end with words valid card number', () => {
        expect(isContainCardNumber('start' + splitValidCardNumber + 'end')).toBeTruthy();
    });

    it('should true for valid card number next after random numbers', () => {
        expect(isContainCardNumber('6511 ' + splitValidCardNumber)).toBeTruthy();
    });

    it('should false for invalid card number', () => {
        expect(isContainCardNumber(invalidCardNumber)).toBeFalsy();
    });

    it('should false for empty', () => {
        expect(isContainCardNumber('')).toBeFalsy();
    });
});
