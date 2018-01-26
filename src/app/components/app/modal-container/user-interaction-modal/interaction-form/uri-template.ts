import { isString } from 'lodash';
import parser, { FormStartExpression } from 'uri-template';

const hasTerminationUriParam = (expression: FormStartExpression): boolean =>
    !!expression.params.find((param) => param.name === 'termination_uri');

export const hasTerminationUriTemplate = (value: any): boolean => {
    if (!isString(value)) {
        return false;
    }
    const {expressions} = parser.parse(decodeURIComponent(value));
    let result = false;
    if (expressions && expressions.length === 1) {
        const hasTermUri = hasTerminationUriParam(expressions[0]);
        if (!hasTermUri) {
            console.error(`termination_uri is not found. Value: ${value}`);
        }
        result = hasTermUri;
    }
    return result;
};

export const expandWithRedirect = (origin: string, template: string, decode: boolean = false): string => {
    const decoded = decodeURIComponent(template);
    const parsed = parser.parse(decoded);
    const redirectUrl = `${origin}/html/finishInteraction.html`;
    const expanded = parsed.expand({termination_uri: redirectUrl});
    return decode ? decodeURIComponent(expanded) : expanded;
};
