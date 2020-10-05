/**
 * Very useful with switch-case for checking unreachable cases
 * more info https://stackoverflow.com/questions/39419170/how-do-i-check-that-a-switch-block-is-exhaustive-in-typescript
 */
export function assertUnreachable(x: never) {
    return x;
}
