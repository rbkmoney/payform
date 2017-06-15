import currencyFormatter from 'currency-formatter';

export default function(amount, currency) {
    return `${currencyFormatter.format(amount, { code: currency })}`;
}