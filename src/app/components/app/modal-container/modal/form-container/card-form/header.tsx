import * as React from 'react';
import { connect } from 'react-redux';
import { Locale } from 'checkout/locale';
import { findNamed } from 'checkout/utils';
import { FormName, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import * as formStyles from '../form-container.scss';
import { ChevronBack } from '../chevron-back';
import {NavigateDirection, navigateTo} from 'checkout/actions';
import { bindActionCreators, Dispatch } from 'redux';

export interface HeaderProps {
    hasBack: boolean;
    locale: Locale;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
}

const back = (props: HeaderProps) => props.navigateTo(FormName.paymentMethods, NavigateDirection.back);

const HeaderDef: React.SFC<HeaderProps> = (props) => (
    <div className={formStyles.header}>
        {props.hasBack ? <ChevronBack back={back.bind(null, props)}/> : null}
        <div className={formStyles.title}>
            {props.locale['form.header.pay.card.label']}
        </div>
    </div>
);

const hasBack = (modals: ModalState[]): boolean => {
    const info = (findNamed(modals, ModalName.modalForms) as ModalForms).formsInfo;
    return !!findNamed(info, FormName.paymentMethods);
};

const mapStateToProps = (state: State) => ({
    hasBack: hasBack(state.modals),
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigateTo: bindActionCreators(navigateTo, dispatch)
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderDef);
