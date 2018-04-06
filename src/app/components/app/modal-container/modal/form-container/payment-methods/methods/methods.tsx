import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { FormInfo, PaymentMethod } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { getMethods } from './get-methods';
import { list, appear, leave } from './methods.scss';

export interface MethodsProps {
    methods: PaymentMethod[];
    locale: Locale;
    setFormInfo: (formInfo: FormInfo) => any;
}

export const Methods: React.SFC<MethodsProps> = (props) => {
    const {methods, locale, setFormInfo} = props;
    return (
        <CSSTransitionGroup
            component='ul'
            className={list}
            transitionName={{enter: null, appear, leave}}
            transitionEnter={false}
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionLeaveTimeout={1000}>
            {getMethods(methods, {locale, setFormInfo})}
        </CSSTransitionGroup>
    );
};
