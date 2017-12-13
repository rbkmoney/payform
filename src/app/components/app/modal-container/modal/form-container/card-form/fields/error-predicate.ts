import { WrappedFieldMetaProps } from 'redux-form';

export const isError = (meta: WrappedFieldMetaProps) => (!meta.pristine || meta.submitFailed) ? meta.error : false;
