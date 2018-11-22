import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { InitConfig } from 'checkout/config';
import { FormInfo, ModalForms, ModalName, ModalState, State } from 'checkout/state';
import { Direction, goToFormInfo } from 'checkout/actions';
import { ChevronBack } from '../form-container/chevron-back';
import { findInfoWithPrevious, findNamed } from 'checkout/utils';
import styled from 'checkout/styled-components';
import { device } from 'checkout/utils/device';

const Header = styled.header`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    height: 60px;
    background-color: #fff;
    align-items: center;
    padding: 0 25px;
    justify-content: center;

    @media ${device.mobile} {
        display: none;
    }
`;

const Text = styled.div`
    position: relative;
    font-weight: 500;
    height: 20px;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 20px;
    color: ${({ theme }) => theme.color.neutral[0.9]};
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
`;

const Back = styled(ChevronBack)`
    display: flex;
    height: 20px;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: absolute;
    left: 20px;
    width: 20px;
    z-index: 1;

    @media ${device.mobile} {
        display: none;
    }

    svg {
        height: 15px;
        width: 9px;
    }
`;

export interface MobileHeaderProps {
    initConfig: InitConfig;
    goToFormInfo: (formInfo: FormInfo, direction: Direction) => any;
    destination: FormInfo;
}

const getDestination = (modals: ModalState[]): FormInfo => {
    const modalForms = findNamed(modals, ModalName.modalForms) as ModalForms;
    const withPrevious = findInfoWithPrevious(modals);
    return withPrevious ? (findNamed(modalForms.formsInfo, withPrevious.previous) as FormInfo) : null;
};

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
    destination: getDestination(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

const MobileHeaderDef: React.SFC<MobileHeaderProps> = (props) => (
    <Header>
        {!!props.destination && (
            <Back back={props.goToFormInfo.bind(null, props.destination, Direction.back)} id="mobile-back-btn" />
        )}
        <Text>{props.initConfig.name}</Text>
    </Header>
);

export const MobileHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileHeaderDef);
