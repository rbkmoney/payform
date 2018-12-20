import { bindActionCreators, Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';

import * as formStyles from '../form-container.scss';
import { Direction, goToFormInfo } from 'checkout/actions';
import { findInfoWithPrevious, findNamed } from 'checkout/utils';
import { FormInfo, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { ChevronBack } from '../chevron-back';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/title';

export interface HeaderProps {
    title: string;
    goToFormInfo: (formInfo: FormInfo, direction: Direction) => any;
    destination: FormInfo;
}

const getDestination = (modals: ModalState[]): FormInfo => {
    const modalForms = findNamed(modals, ModalName.modalForms) as ModalForms;
    const withPrevious = findInfoWithPrevious(modals);
    return withPrevious ? (findNamed(modalForms.formsInfo, withPrevious.previous) as FormInfo) : null;
};

const mapStateToProps = (state: State) => ({
    destination: getDestination(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

const HeaderDef: React.FC<HeaderProps> = (props) => (
    <div className={formStyles.header}>
        {props.destination ? (
            <ChevronBack
                className={formStyles.back_btn}
                onClick={props.goToFormInfo.bind(null, props.destination, Direction.back)}
                id="desktop-back-btn"
            />
        ) : null}
        <Title>{props.title}</Title>
    </div>
);

export const Header = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderDef);
