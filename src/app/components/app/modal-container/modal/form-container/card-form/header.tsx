import * as React from 'react';
import { connect } from 'react-redux';
import { Locale } from 'checkout/locale';
import { findNamed } from 'checkout/utils';
import { FormName, ModalForms, ModalName, ModalState, SlideDirection, State } from 'checkout/state';
import * as formStyles from '../form-container.scss';
import { ChevronBack } from '../chevron-back';
import { navigateToFormInfo } from 'checkout/actions';
import { bindActionCreators, Dispatch } from 'redux';

export interface HeaderProps {
    hasBack: boolean;
    locale: Locale;
    navigateToFormInfo: (formName: FormName, slideDirections: SlideDirection) => any;
}

const back = (props: HeaderProps) => props.navigateToFormInfo(FormName.paymentMethods, SlideDirection.left);

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
    navigateToFormInfo: bindActionCreators(navigateToFormInfo, dispatch)
});

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderDef);
