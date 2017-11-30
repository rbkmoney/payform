import { cardHolderUppercase } from './card-holder-uppercase';

export function cardHolderFormatter(element: Element) {
    element.addEventListener('keypress', cardHolderUppercase);
    element.addEventListener('keydown', cardHolderUppercase);
    element.addEventListener('change', cardHolderUppercase);
    element.addEventListener('input', cardHolderUppercase);
}
