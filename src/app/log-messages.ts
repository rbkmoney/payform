export const logPrefix = '[RbkmoneyCheckout]';
export const sadnessMessage = 'Param will not be applied.';
export const getMessageInvalidValue = (fieldName: string, value: string, reason: string): string =>
    `${logPrefix} Invalid value of param '${fieldName}':'${value}'. ${reason} ${sadnessMessage}`;
