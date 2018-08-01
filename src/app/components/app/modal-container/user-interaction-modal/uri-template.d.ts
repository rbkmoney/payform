declare module 'uri-template' {
    export interface ExpressionParam {
        name: string;
        extended: string;
        explode: string;
        cut: string;
    }

    export interface FormStartExpression {
        params: ExpressionParam[];
    }

    export interface Template {
        expressions: FormStartExpression[];
        prefix: string;
        expand: (vars: object) => string;
    }

    export default class parser {
        static parse(input: string, startRule?: string): Template;
    }
}
