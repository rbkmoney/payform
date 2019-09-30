import * as cardValidator from 'card-validator';

/**
 * Get the options for direct combining strings
 */
function getAllOptions(numberParts: string[]): string[] {
    const numberOptions = numberParts.slice();
    for (let length = 2; length <= numberParts.length; ++length) {
        for (let i = 0; i <= numberParts.length - length; ++i) {
            numberOptions.push(numberParts.slice(i, i + length).join(''));
        }
    }
    return numberOptions;
}

export function isContainCardNumber(value: string): boolean {
    const numberParts = value
        .trim()
        .split(/\D+/)
        .filter((d) => !!d);
    const numberOptions = getAllOptions(numberParts);
    for (const numberOption of numberOptions) {
        if (cardValidator.number(numberOption).isValid) {
            return true;
        }
    }
    return false;
}
