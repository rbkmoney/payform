import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { ResultAction } from 'checkout/actions/result-action';
import { setResult } from 'checkout/actions';
import { ResultState } from 'checkout/state';
import { Cross } from 'checkout/components';
import { device } from 'checkout/utils/device';
import styled from 'checkout/styled-components';

const CloseWrapper = styled.div`
    display: none;
    position: absolute;
    right: -30px;
    top: -27px;
    cursor: pointer;

    @media ${device.desktop} {
        display: block;
    }
`;

const StyledCross = styled(Cross)`
    height: 22px;
    width: 22px;
`;

interface CloseProps {
    setResult: (resultState: ResultState) => ResultAction;
}

const mapDispatchToProps = (dispatch: Dispatch<ResultAction>) => ({
    setResult: bindActionCreators(setResult, dispatch)
});

const CloseDef: React.FC<CloseProps> = (props) => (
    <CloseWrapper onClick={props.setResult.bind(null, ResultState.close)}>
        <StyledCross />
    </CloseWrapper>
);

export const Close = connect(null, mapDispatchToProps)(CloseDef);
