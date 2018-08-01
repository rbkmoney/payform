import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldProps } from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { validateCardHolder } from './validate-card-holder';
import { Locale } from 'checkout/locale';
import { isError } from '../../../common-fields/error-predicate';
import { cardHolderUppercase } from './card-holder-uppercase';

export interface CardHolderProps {
    locale: Locale;
}

const getCustomInput = (props: CardHolderProps, fieldProps: WrappedFieldProps) => (
    <Input
        {...fieldProps.input}
        {...fieldProps.meta}
        error={isError(fieldProps.meta)}
        icon={IconType.user}
        placeholder={props.locale['form.input.cardholder.placeholder']}
        mark={true}
        id="card-holder-input"
        onInput={cardHolderUppercase}
    />
);

export const CardHolderDef: React.SFC<CardHolderProps> = (props) => (
    <Field name="cardHolder" component={getCustomInput.bind(null, props)} validate={validateCardHolder} />
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const CardHolder = connect(mapStateToProps)(CardHolderDef);
