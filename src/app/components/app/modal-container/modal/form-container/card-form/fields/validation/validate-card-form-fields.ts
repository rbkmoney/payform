import { validateCardHolder, validateCardNumber, validateEmail, validateExpireDate, validateSecureCode } from '.';
import { Dispatch } from 'redux';
import { FormProps } from 'redux-form';

export function validateCardFormFields(values: any, dispatch: Dispatch<''>, props: FormProps, blurredField: string): Promise<undefined | object> {
    return new Promise((resolve, reject) => {
        const errors: any = {};
        let hasErrors = false;

        if (blurredField === 'cardNumber' && validateCardNumber(values.cardNumber)) {
            errors.cardNumber = true;
            hasErrors = true;
        }

        if (blurredField === 'expireDate' && validateExpireDate(values.expireDate)) {
            errors.expireDate = true;
            hasErrors = true;
        }

        if (blurredField === 'secureCode'
            && values.cardNumber
            && validateSecureCode(values.secureCode, values.cardNumber)) {
            errors.secureCode = true;
            hasErrors = true;
        }

        if (blurredField === 'cardHolder' && validateCardHolder(values.cardHolder)) {
            errors.cardHolder = true;
            hasErrors = true;
        }

        if (blurredField === 'email' && validateEmail(values.email)) {
            errors.email = true;
            hasErrors = true;
        }

        if (hasErrors) {
            reject(errors);
        } else {
            resolve();
        }
    });
}
