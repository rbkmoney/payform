import * as React from 'react';
import { connect } from 'react-redux';

import { ModalInfo, ModalInfoType, ModalName, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { device } from 'checkout/utils/device';
import styled, { css } from 'checkout/styled-components';
import { findNamed } from 'checkout/utils';
import { ListItem, NumerableList } from '../../modal/form-container/numerable-list';
import { shake } from 'checkout/styled-components/animations';

const Container = styled.div`
    padding: 0 5px;

    @media ${device.desktop} {
        padding: 0;
    }
`;

const Form = styled.div<{ error?: any; height?: number }>`
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.25);
    padding: 30px 20px;
    position: relative;
    overflow: hidden;
    transition: height 0.4s;
    height: ${({ height }) => (height ? `${height}px` : 'auto')};

    @media ${device.desktop} {
        padding: 30px;
        min-height: auto;
    }

    ${({ error }) =>
        error &&
        css`
            animation: ${shake} 0.82s;
        `}
`;

export interface InfoProps {
    modal: ModalInfo;
    locale: Locale;
}

const mapStateToProps = (s: State) => {
    const {
        config: { locale }
    } = s;
    return {
        modal: findNamed(s.modals, ModalName.modalInfo),
        locale
    };
};

const Instruction: React.FC<InfoProps> = (props) => {
    switch (props.modal.type) {
        case ModalInfoType.MobileCommerce:
            return (
                <NumerableList>
                    <ListItem number={1}>{props.locale['info.modal.mobile.commerce.description.step.one']}</ListItem>
                    <ListItem number={2}>{props.locale['info.modal.mobile.commerce.description.step.two']}</ListItem>
                </NumerableList>
            );
    }
};

const InfoDef: React.FC<InfoProps> = (props) => {
    return (
        <Container>
            <Form>
                <div>
                    <Instruction {...props} />
                </div>
            </Form>
        </Container>
    );
};

export const Info = connect(mapStateToProps)(InfoDef);
