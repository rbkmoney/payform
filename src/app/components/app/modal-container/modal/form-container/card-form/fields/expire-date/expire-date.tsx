import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { validateExpireDate } from './validate-expire-date';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';
import { formatExpiry } from './format-expiry';

export interface ExpireDateProps {
    locale: Locale;
}

const getCustomInput = (props: ExpireDateProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        icon={IconType.calendar}
        placeholder={props.locale['form.input.expiry.placeholder']}
        mark={true}
        type="tel"
        id="expire-date-input"
        onInput={formatExpiry}
    />
);

export const ExpireDateDef: React.SFC<ExpireDateProps> = (props) => (
    <Field name="expireDate" component={getCustomInput.bind(null, props)} validate={validateExpireDate} />
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const ExpireDate = connect(mapStateToProps)(ExpireDateDef);
