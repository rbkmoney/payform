# Payform
[![Build Status](http://ci.rbkmoney.com/buildStatus/icon?job=rbkmoney_private/payform/master)](http://ci.rbkmoney.com/job/rbkmoney_private/job/payform/job/master)

## Настройка
Конфигурация происходит в файле [appConfig.json](/src/appConfig.json)

Для изменения конфигурации в рантайме достаточно заменить `appConfig.json`

Например в случае с nginx `appConfig.json` нужно положить в `/usr/share/nginx/html`

## Использование
### Пример интеграции
```html
<script src="https://checkout.rbk.money/payframe/payframe.js" class="rbkmoney-checkout"
        data-invoice-id="string"
        data-invoice-access-token="string"
        data-endpoint-success="https://<your-server-side>"
        data-endpoint-success-method="GET"
        data-endpoint-failed="https://<your-server-side>"
        data-endpoint-failed-method="POST"
        data-name="Company name"
        data-amount="7,700"
        data-currency="Р"
        data-logo="https://checkout.rbk.money/checkout/images/logo.png">
</script>
```
### Описание data-* атрибутов
| data-* атрибут           | Описание                                              | Обязательный | Возможные значения           |
| :----------------------: | ----------------------------------------------------- | :-----------:| :---------------------------:|
| invoice id               | Идентификатор инвойса                                 | ✓            | oVU2LzUCbQ                   |
| invoice access token     | Токен для доступа к указанному инвойсу                | ✓            | eyJhbGciOiJSUzI1N...         |
| endpoint success         | URL для отправки запроса в случае успешного платежа   |              | `https://<your-server-side>` |
| endpoint success method  | Тип Http метода для endpoint success                  |              | GET, POST (по умолчанию)     |
| endpoint failed          | URL для отправки запроса в случае неуспешного платежа |              | `https://<your-server-side>` |
| endpoint failed method   | Тип Http метода для endpoint failed                   |              | GET, POST (по умолчанию)     |
| name                     | Метка для задания именования формы                    |              | Company name                 |
| amount                   | Метка для вывода стоимости платежа                    |              | 7000                         |
| currency                 | Метка для вывода валюты                               |              | P                            |
| logo                     | URL для задания логотипа                              |              | `https://<your-server-side>` |

Примечание. Запросы на endpoint success, endpoint failed отправляются с `"Content-Type": "x-form-urlencoded"`.
