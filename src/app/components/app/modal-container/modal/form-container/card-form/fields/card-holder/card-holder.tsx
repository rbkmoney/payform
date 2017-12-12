import * as React from 'react';
import { connect } from 'react-redux';
import {
    Field,
    WrappedFieldInputProps,
    WrappedFieldProps
} from 'redux-form';
import { IconType } from 'checkout/components/ui';
import { State } from 'checkout/state';
import { Input } from '../../../input';
import { cardHolderFormatter } from '../format';
import { validateCardHolder } from '../validation';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

export interface CardHolderDefProps {
    locale: any;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & CardHolderDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={!props.meta.pristine ? props.meta.error : false}
        formatter={cardHolderFormatter}
        icon={IconType.user}
        placeholder={props.locale['form.input.cardholder.placeholder']}
        mark={true}
    />
);

export const CardHolderDef: React.SFC<CardHolderDefProps> = (props) => (
    <Field
        name='cardHolder'
        component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
        validate={validateCardHolder}
    />
);

export const CardHolder = connect(mapStateToProps)(CardHolderDef);
