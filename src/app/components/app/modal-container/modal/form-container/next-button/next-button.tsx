import * as React from 'react';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';

export interface PayButtonProps {
    locale: Locale;
}

const NextButtonDef: React.SFC<PayButtonProps> = (props) => (
    <Button
        type='submit'
        style='primary'
        id='pay-btn'>
        {props.locale['form.button.next.label']}
    </Button>
);

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

export const NextButton = connect(mapStateToProps)(NextButtonDef);
