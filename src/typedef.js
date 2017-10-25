/**
 * @typedef {Object} CardData
 * @property {string} cardHolder
 * @property {string} cardNumber
 * @property {string} cardExpire
 * @property {string} cardCvv
 */

/**
 * @typedef {Object} Payload
 * @property {string} token
 * @property {string} session
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} [email]
 * @property {string} [phoneNumber]
 */

/**
 * @typedef {Object} PaymentParamsFlow
 * @property {string} type=PaymentFlowInstant,PaymentFlowHold
 * @property {string} [onHoldExpiration=cancel,capture]
 */

/**
 * @typedef {Object} PaymentParams
 * @property {PaymentParamsFlow} flow
 * @property {ContactInfo} contactInfo
 * @property {string} paymentSession
 * @property {string} paymentToolToken
 */

/**
 * @typedef {Object} Payment
 */

/**
 * @typedef {Object} Invoice
 */

/**
 * @typedef {Object} Customer
 */

/**
 * @typedef {Object} InvoicePaymentMethods
 */

/**
 * @typedef {Object} InvoiceTemplate
 */

/**
 * @typedef {Object} Event
 */

/**
 * @typedef {Object} InvoiceParamsWithTemplate
 * @property {number} amount
 * @property {string} currency
 * @property {Object} metadata
 */

/**
 * @typedef {Object} InvoiceTemplateLineCost
 * */

/**
 * @typedef {Object} InvoiceLine
 * */
