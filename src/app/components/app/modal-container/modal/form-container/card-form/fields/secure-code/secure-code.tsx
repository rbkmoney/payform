import * as React from 'react';
import { connect } from 'react-redux';
import { Field, WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Input } from '../../../input';
import { IconType } from 'checkout/components';
import { secureCodeFormatter } from '../format';
import { validateSecureCode } from '../validation';
import { State } from 'checkout/state';

type FieldProps = WrappedFieldInputProps & WrappedFieldProps;

export interface SecureCodeDefProps {
    locale: any;
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const CustomInput: React.SFC<FieldProps & SecureCodeDefProps> = (props) => (
    <Input
        {...props.input}
        {...props.meta}
        error={!props.meta.pristine ? props.meta.error : false}
        formatter={secureCodeFormatter}
        icon={IconType.lock}
        placeholder={props.locale['form.input.secure.placeholder']}
        mark={true}
    />
);

export const SecureCodeDef: React.SFC<SecureCodeDefProps> = (props) => (
    <Field name='secureCode' component={(fieldProps: FieldProps) => CustomInput({...fieldProps, ...props})}
           validate={validateSecureCode}/>
);

export const SecureCode = connect(mapStateToProps)(SecureCodeDef);
