// lgtm[js/conditional-comment]
export const isIE: boolean = /*@cc_on!@*/ false || (!!document as any).documentMode;
