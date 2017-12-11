// import {
//     validateCardHolder,
//     validateCardNumber,
//     validateEmail,
//     validateExpireDate,
//     validateSecureCode
// } from '.';
// import { Dispatch } from 'redux';
// import { FormProps } from 'redux-form';
//
// interface Values {
//     cardNumber?: string;
//     expireDate?: string;
//     secureCode?: string;
//     cardHolder?: string;
//     email?: string;
// }
//
// enum Fields {
//     cardNumber = 'cardNumber',
//     expireDate = 'expireDate',
//     secureCode = 'secureCode',
//     cardHolder = 'cardHolder',
//     email = 'email'
// }
//
// export function validateCardFormFields(values: Values, dispatch: Dispatch<''>, props: FormProps, blurredField: Fields): Promise<undefined | object> {
//     return new Promise((resolve, reject) => {
//         const errors: any = {};
//         let hasErrors = false;
//
//         if (blurredField === 'cardNumber' && validateCardNumber(values.cardNumber)) {
//             errors.cardNumber = true;
//             hasErrors = true;
//         }
//
//         if (blurredField === 'expireDate' && validateExpireDate(values.expireDate)) {
//             errors.expireDate = true;
//             hasErrors = true;
//         }
//
//         if (blurredField === 'secureCode'
//             && values.cardNumber
//             && validateSecureCode(values.secureCode, values.cardNumber)) {
//             errors.secureCode = true;
//             hasErrors = true;
//         }
//
//         if (blurredField === 'cardHolder' && validateCardHolder(values.cardHolder)) {
//             errors.cardHolder = true;
//             hasErrors = true;
//         }
//
//         if (blurredField === 'email' && validateEmail(values.email)) {
//             errors.email = true;
//             hasErrors = true;
//         }
//
//         if (hasErrors) {
//             reject(errors);
//         } else {
//             resolve();
//         }
//     });
// }
