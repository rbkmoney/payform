import * as cardValidator from 'card-validator';
import { excludedCards } from './excluded-cards';

export function validateCardNumber(value: string): boolean {
    return !value || !(cardValidator.number(value).isValid || excludedCards.includes(value.replace(/ /g, '')));
}
