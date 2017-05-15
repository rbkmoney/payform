# Payform
[![Build Status](http://ci.rbkmoney.com/buildStatus/icon?job=rbkmoney_private/payform/master)](http://ci.rbkmoney.com/job/rbkmoney_private/job/payform/job/master)

## Настройка
Конфигурация происходит в файле [appConfig.json](/src/appConfig.json)

Для изменения конфигурации в рантайме достаточно заменить `appConfig.json`

Например в случае с nginx `appConfig.json` нужно положить в `/usr/share/nginx/html`

## Использование
### Пример html интеграции
```html
<form action="/success" method="GET">
    <script src="https://checkout.rbk.money/checkout.js" class="rbkmoney-checkout"
            data-invoice-id="string"
            data-invoice-access-token="string"
            data-name="Company name"
            data-logo="https://checkout.rbk.money/checkout/images/logo.png">
    </script>
</form>
```

При успешном платеже будет выполнен submit обрамляющей формы при ее наличии.
### Описание data-* атрибутов
| data-* атрибут           | Описание                                              | Обязательный | Возможные значения                    |
| :----------------------: | ----------------------------------------------------- | :-----------:| :------------------------------------:|
| invoice id               | Идентификатор инвойса                                 | ✓            | oVU2LzUCbQ                            |
| invoice access token     | Токен для доступа к указанному инвойсу                | ✓            | eyJhbGciOiJSUzI1N...                  |
| name                     | Метка для задания именования формы                    |              | Company name                          |
| logo                     | URL для задания логотипа                              |              | `https://<your-server-side>/logo.png` |
| label                    | Текст для кнопки                                      |              | Pay with RBKmoney                     |
| popup mode               | Открыть Checkout в новом окне                         |              | boolean                               |

### Пример js интеграции
```html
<script src="https://checkout.rbk.money/checkout.js"></script>
<script>
    const checkout = RbkmoneyCheckout.configure(config);
</script>
```
### Описание методов RbkmoneyCheckout
| Метод                    | Описание                                              | Аргументы                 |
| :----------------------: | ----------------------------------------------------- | :------------------------:|
| configure                | Возвращает новое модальное окно с платежом            | config                    |
| open                     | Открывает модальное окно с платежом                   |                           |
| close                    | Закрывает модальное окно с платежом                   |                           |

### Описание config-объекта
| Свойство                 | Описание                                              | Обязательный | Возможные значения                    |
| :----------------------: | ----------------------------------------------------- | :-----------:| :------------------------------------:|
| invoiceID                | Идентификатор инвойса                                 | ✓            | oVU2LzUCbQ                            |
| invoiceAccessToken       | Токен для доступа к указанному инвойсу                | ✓            | eyJhbGciOiJSUzI1N...                  |
| name                     | Метка для задания именования формы                    |              | Company name                          |
| logo                     | URL для задания логотипа                              |              | `https://<your-server-side>/logo.png` |
| opened                   | callback на открытие модального окна                  |              | function                              |
| closed                   | callback на закрытие модального окна                  |              | function                              |
| finished                 | callback на успешное завершение платежа               |              | function                              |
| popup mode               | Открыть Checkout в новом окне                         |              | boolean                               |
