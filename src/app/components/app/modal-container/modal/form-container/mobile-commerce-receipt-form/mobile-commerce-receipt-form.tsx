import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'checkout/state';
import { Locale } from 'checkout/locale';

import { NumerableList, ListItem } from '../numerable-list';

const mapStateToProps = (s: State) => ({
    locale: s.config.locale
});

export interface MobileCommerceReceiptFormProps {
    locale: Locale;
}

class MobileCommerceReceiptFormDef extends React.Component<MobileCommerceReceiptFormProps> {
    render() {
        const { locale } = this.props;
        return (
            <NumerableList>
                <ListItem number={1}>{locale['info.modal.mobile.commerce.description.steps'][0]}</ListItem>
                <ListItem number={2}>{locale['info.modal.mobile.commerce.description.steps'][1]}</ListItem>
            </NumerableList>
        );
    }
}

export const MobileCommerceReceiptForm = connect(mapStateToProps)(MobileCommerceReceiptFormDef);
