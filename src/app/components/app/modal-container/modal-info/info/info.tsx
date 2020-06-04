import * as React from 'react';
import { connect } from 'react-redux';

import { ModalInfo, ModalInfoType, ModalName, State } from 'checkout/state';
import { Locale } from 'checkout/locale';
import { device } from 'checkout/utils/device';
import styled from 'checkout/styled-components';
import { findNamed } from 'checkout/utils';
import { ListItem, NumerableList } from '../../modal/form-container/numerable-list';

const InfoWrapper = styled.div`
    padding: 30px 25px;

    @media ${device.desktop} {
        padding: 0;
        width: 230px;
        margin-right: 30px;
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

const CompanyName = styled.h4`
    display: none;
    font-weight: 500;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    line-height: 20px;
    margin: 0 0 30px;

    @media ${device.desktop} {
        display: block;
    }
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
                    <ListItem number={1}>{props.locale['info.modal.mobile.commerce.description.step.one']}.</ListItem>
                    <ListItem number={2}>{props.locale['info.modal.mobile.commerce.description.step.two']}.</ListItem>
                </NumerableList>
            );
    }
};

const InfoDef: React.FC<InfoProps> = (props) => {
    return (
        <InfoWrapper>
            <div>
                <CompanyName id="info-title">{props.locale['info-title']}</CompanyName>
                <div>
                    <Instruction {...props} />
                </div>
            </div>
        </InfoWrapper>
    );
};

export const Info = connect(mapStateToProps)(InfoDef);
