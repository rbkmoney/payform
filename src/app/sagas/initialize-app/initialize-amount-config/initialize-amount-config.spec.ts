import { TypeKeys } from 'checkout/actions';
import { put } from 'redux-saga/effects';
import { initializeAmountConfig } from './initialize-amount-config';
import { getAmountInfo } from './get-amount-info';

jest.mock('./get-amount-info');

const getAmountInfoMock = getAmountInfo as any;

describe('initializeAmountConfig', () => {
    const initConfig = 'initConfigMock' as any;
    const model = 'modelMock' as any;
    const iterator = initializeAmountConfig(initConfig, model);

    it('should call getAmountInfo and put to action', () => {
        const amountConfigMock = 'prioritizedMethodsMock';
        getAmountInfoMock.mockReturnValueOnce(amountConfigMock);

        const actual = iterator.next(amountConfigMock).value;

        const expected = put({
            type: TypeKeys.INITIALIZE_AMOUNT_INFO_COMPLETED,
            payload: amountConfigMock
        });
        expect(actual).toEqual(expected);
        expect(getAmountInfoMock.mock.calls.length).toBe(1);
        expect(getAmountInfoMock.mock.calls[0]).toEqual([initConfig, model]);
    });
});
