declare namespace YaPay {
    /**
     * Хелперы
     */
    type Listener<T> = (event: T) => void;
    type UnsubscribeCallback = () => void;
    interface TypedObject<T> {
        type: T;
    }

    /**
     * Общие типы.
     */
    /**
     * Должно быть больше 0 и не содержать больше двух знаков после запятой.
     * Например 1.12, 5.1, 10.
     */
    type Price = string;
    /**
     * Платежная криптограмма.
     */
    type PaymentToken = string;
    /**
     * Окружение в котором совершается платеж
     */
    enum PaymentEnv {
        Production = 'PRODUCTION',
        Sandbox = 'SANDBOX'
    }
    /**
     * Код страны по стандарту ISO 3166-1 alpha-2.
     */
    enum CountryCode {
        Ru = 'RU',
        Us = 'US'
    }
    /**
     * Код валюты по стандарту ISO 4217.
     */
    enum CurrencyCode {
        Rub = 'RUB',
        Usd = 'USD'
    }
    /**
     * Информация о продавце
     */
    interface Merchant {
        /**
         * ID продавца.
         */
        id: string;
        /**
         * Имя продавца (отображается на платежной форме).
         */
        name: string;
    }
    /**
     * Информация о заказе
     */
    interface OrderTotal {
        /**
         * Текст для поля total.
         */
        label?: string;
        amount: Price;
    }

    interface OrderItem {
        label: string;
        amount: Price;
    }

    interface Order {
        /**
         * ID заказа на стороне продавца.
         */
        id: string;
        total: OrderTotal;
        items?: OrderItem[];
    }
    /**
     * Описание методов оплаты.
     */
    enum PaymentMethodType {
        Card = 'CARD'
    }
    enum AllowedAuthMethod {
        CloudToken = 'CLOUD_TOKEN',
        PanOnly = 'PAN_ONLY'
    }
    enum AllowedCardNetwork {
        AmericanExpress = 'AMEX',
        Discover = 'DISCOVER',
        Jsb = 'JSB',
        Mastercard = 'MASTERCARD',
        Visa = 'VISA',
        Mir = 'MIR',
        UnionPay = 'UNIONPAY',
        Uzcard = 'UZCARD'
    }
    interface CardPaymentMethod extends TypedObject<PaymentMethodType.Card> {
        /**
         * ID поставщика платежных услуг.
         */
        gateway: string;
        /**
         * ID магазина в системе поставщика платежных услуг.
         */
        gatewayMerchantId: string;
        /**
         * Платежные методы, которые поддерживает поставщик платежных услуг.
         */
        allowedAuthMethods: AllowedAuthMethod[];
        /**
         * Платежные системы, которые поддерживает сайт и поставщик платежных услуг.
         */
        allowedCardNetworks: AllowedCardNetwork[];
    }
    type PaymentMethod = CardPaymentMethod;
    interface CardPaymentMethodInfo extends TypedObject<PaymentMethodType.Card> {
        /**
         * Дополнительные данные о методе.
         */
        cardLast4: string;
        cardNetwork: string;
    }
    type PaymentMethodInfo = CardPaymentMethodInfo;
    /**
     * Настройки для платежа
     */
    interface PaymentSheet {
        /**
         * Версия клиентского SDK
         */
        version: number;
        /**
         * Необходим для продавцов из Европейской экономической зоны.
         */
        countryCode: CountryCode;
        currencyCode: CurrencyCode;
        merchant: Merchant;
        order: Order;
        paymentMethods: PaymentMethod[];
    }
    interface PaymentData extends PaymentSheet {
        /**
         * @default PaymentEnv.PRODUCTION
         */
        env?: PaymentEnv;
    }
    /**
     * События формы.
     */
    enum PaymentEventType {
        Ready = 'ready',
        Abort = 'abort',
        Error = 'error',
        Process = 'process'
    }
    type ReadyEvent = TypedObject<PaymentEventType.Ready>;
    enum AbortEventReason {
        /**
         * Покупатель закрыл форму оплаты.
         */ Close = 'CLOSE',
        /**
         * Покупатель не успел совершить оплату.
         */
        Timeout = 'TIMEOUT'
    }
    interface AbortEvent extends TypedObject<PaymentEventType.Abort> {
        reason?: AbortEventReason;
    }
    enum ErrorEventReason {
        /**
         * Ошибка проверки второго фактора.
         */ CodeCheckFailed = 'CODE_CHECK_FAILED',
        /**
         * Сумма заказа превышает максимально возможную.
         */
        AmountLimitExceeded = 'AMOUNT_LIMIT_EXCEEDED',
        /**
         * Карта не найдена, или токен не существует, или токен не активен.
         */ CardNotFound = 'CARD_NOT_FOUND',
        /**
         * Числа вроде: 0.00 (ноль), -10.01 (отрицательное число), 10.0001 (слишком точное число).
         */
        InvalidAmount = 'INVALID_AMOUNT',
        /**
         * Пока поддерживается только "RU"
         */
        InvalidCountry = 'INVALID_COUNTRY',
        /**
         * Пока поддерживается только "RUB"
         */
        InvalidCurrency = 'INVALID_CURRENCY',
        /**
         * Текущая версия 2.
         */
        InvalidVersion = 'INVALID_VERSION',
        /**
         * Продавец не найден.
         */
        MerchantNotFound = 'MERCHANT_NOT_FOUND',
        /**
         * PSP не найден.
         */
        GatewayNotFound = 'GATEWAY_NOT_FOUND',
        /**
         * Карта принадлежит визе (или миру).
         */
        CardNetworkNotSupported = 'CARD_NETWORK_NOT_SUPPORTED',
        /**
         * Неизвестный домен продавца.
         * Проверьте регистрацию веб-домена в Yandex.Pay.
         */
        MerchantDomainError = 'MERCHANT_DOMAIN_ERROR',
        /**
         * Домен с незащищенным протоколом HTTP.
         */
        InsecureMerchantDomain = 'INSECURE_MERCHANT_DOMAIN'
    }
    interface ErrorEvent extends TypedObject<PaymentEventType.Error> {
        reason?: ErrorEventReason;
        details?: any;
    }
    interface ProcessEvent extends TypedObject<PaymentEventType.Process> {
        token: PaymentToken;
        paymentMethodInfo: PaymentMethodInfo;
    }
    type PaymentEvent = ReadyEvent | AbortEvent | ErrorEvent | ProcessEvent;
    /**
     * Сообщения SDK.
     */
    enum MessageType {
        Payment = 'payment',
        Complete = 'complete'
    }
    interface PaymentMessage extends TypedObject<MessageType.Payment> {
        sheet: PaymentSheet;
    }
    enum CompleteReason {
        Success = 'success',
        Error = 'error',
        Close = 'close',
        AuthRedirect = 'auth-redirect'
    }
    interface CompleteMessage extends TypedObject<MessageType.Complete> {
        reason: CompleteReason;
        errors?: any;
    }
    type Message = PaymentMessage | CompleteMessage;
    /**
     * Конструктор платежа.
     */
    class Payment {
        constructor(paymentData: PaymentData);

        /**
         * Запускает процесс оплаты.
         */
        checkout(): Promise<void>;
        destroy(): void;
        /**
         * Подписывает на события формы платежа.
         */
        /**
         * Форма оплаты загрузилась.
         */
        on(type: PaymentEventType.Ready, listener: Listener<ReadyEvent>): UnsubscribeCallback;
        /**
         * Оплата была отменена, например пользователь закрыл форму.
         */
        on(type: PaymentEventType.Abort, listener: Listener<AbortEvent>): UnsubscribeCallback;
        /**
         * Произошла ошибка во время оплаты.
         */
        on(type: PaymentEventType.Error, listener: Listener<ErrorEvent>): UnsubscribeCallback;
        /**
         * Запустился процесс оплаты.
         * Вместе с событием возвращается платёжный токен.
         */
        on(type: PaymentEventType.Process, listener: Listener<ProcessEvent>): UnsubscribeCallback;
        /**
         * Дополнительное управление состоянием формы оплаты.
         */
        /**
         * Сообщить форме об успешной оплате.
         */
        complete(reason: CompleteReason.Success): void;
        /**
         * Сообщить форме об ошибке оплаты.
         */
        complete(reason: CompleteReason.Error, errors: unknown): void;
        /**
         * Закрыть платёжную форму.
         */
        complete(reason: CompleteReason.Close): void;
        /**
         * Сообщить форме о редиректе покупателя на стороннюю форму оплаты.
         */
        complete(reason: CompleteReason.AuthRedirect): void;
    }
    /**
     * Настройки платёжной кнопки.
     */
    type ButtonParent = HTMLElement | ShadowRoot;
    enum ButtonType {
        Simple = 'SIMPLE',
        Pay = 'PAY'
    }
    enum ButtonTheme {
        White = 'WHITE',
        WhiteOutlined = 'WHITE-OUTLINED',
        Black = 'BLACK',
        Red = 'RED'
    }
    enum ButtonWidth {
        Auto = 'AUTO',
        Max = 'MAX'
    }
    interface ButtonOptions {
        /**
         * @default ButtonType.SIMPLE
         */
        type?: ButtonType;
        /**
         * @default ButtonTheme.RED
         */
        theme?: ButtonTheme;
        /**
         * @default ButtonWidth.AUTO
         */
        width?: ButtonWidth;
    }
    /**
     * События платёжной кнопки.
     */
    enum ButtonEventType {
        Click = 'CLICK'
    }
    /**
     * Конструктор платёжной кнопки.
     */
    class Button {
        constructor(options: ButtonOptions);
        static create(options: ButtonOptions): Button;
        /**
         * Добавить кнопку в dom-дерева.
         */
        mount(parent: ButtonParent): void;
        /**
         * Удалить кнопку из dom-дерева.
         */
        unmount(): void;
        /**
         * Удаляет все слушатели с кнопки и кнопку из dom-дерева.
         */
        destroy(): void;
        /**
         * Слушатель на клик.
         * Используйте этот параметр для запуска процесса оплаты на клик по кнопке.
         */
        on(type: ButtonEventType.Click, listener: Listener<MouseEvent>): void;
    }

    function createPayment(paymentData: PaymentData): Promise<YaPay.Payment>;
}

declare interface YaPay {
    Payment: YaPay.Payment;
    Button: YaPay.Button;
    /**
     * Enums */
    /**
     * Общие типы.
     */
    PaymentEnv: YaPay.PaymentEnv;
    CountryCode: YaPay.CountryCode;
    CurrencyCode: YaPay.CurrencyCode;
    /**
     * Описание методов оплаты.
     */
    PaymentMethodType: YaPay.PaymentMethodType;
    AllowedAuthMethod: YaPay.AllowedAuthMethod;
    AllowedCardNetwork: YaPay.AllowedCardNetwork;
    /**
     * События формы.
     */
    PaymentEventType: YaPay.PaymentEventType;
    AbortEventReason: YaPay.AbortEventReason;
    ErrorEventReason: YaPay.ErrorEventReason;
    /**
     * Сообщения SDK.
     */
    MessageType: YaPay.MessageType;
    CompleteReason: YaPay.CompleteReason;
    /**
     * Настройки платёжной кнопки.
     */
    ButtonType: YaPay.ButtonType;
    ButtonTheme: YaPay.ButtonTheme;
    ButtonWidth: YaPay.ButtonWidth;
    /**
     * События платёжной кнопки.
     */
    ButtonEventType: YaPay.ButtonEventType;
}
