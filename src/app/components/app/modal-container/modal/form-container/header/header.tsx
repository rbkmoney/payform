import { bindActionCreators, Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';

import { Direction, goToFormInfo } from 'checkout/actions';
import { findInfoWithPrevious, findNamed } from 'checkout/utils';
import { FormInfo, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { ChevronBack } from '../chevron-back';
import { Title } from 'checkout/components/app/modal-container/modal/form-container/title';
import { HeaderWrapper } from '../header-wrapper';
import { device } from 'checkout/utils/device';
import styled from 'checkout/styled-components';

const BackButton = styled(ChevronBack)`
    height: 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: absolute;
    width: 20px;
    display: none;

    @media ${device.desktop} {
        display: flex;
    }

    svg {
        height: 15px;
        width: 9px;
    }
`;

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
    <HeaderWrapper>
        {props.destination && (
            <BackButton
                onClick={props.goToFormInfo.bind(null, props.destination, Direction.back)}
                id="desktop-back-btn"
            />
        )}
        <Title>{props.title}</Title>
    </HeaderWrapper>
);

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderDef);
