import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'checkout/state';
import { Header } from '../header';
import { Locale } from 'checkout/locale';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import * as formStyles from '../form-container.scss';
import { getHelpStep } from './get-help-step';
import styled from 'checkout/styled-components';

const List = styled.ul`
    position: relative;
    list-style-type: none;
    font-weight: 500;
    padding-left: 0;
    margin: 0;
`;

interface HelpDefProps {
    errorCode: string;
    locale: Locale;
}

const getError = (props: HelpDefProps) => {
    const { errorCode, locale } = props;
    return locale['form.help.codes'][errorCode];
};

const HelpDef: React.SFC<HelpDefProps> = (props) => {
    const { text, steps } = getError(props);

    return (
        <form>
            <div>
                <Header title={props.locale['form.help.header']} />
                <p className={formStyles.text} id="help-form-error">
                    {text}
                </p>
                <List id="help-form-steps">{steps.map(getHelpStep)}</List>
            </div>
        </form>
    );
};

const mapStateToProps = (s: State) => ({
    errorCode: getErrorCodeFromEvents(s.events.events, s.config.initConfig.integrationType),
    locale: s.config.locale
});

export const Help = connect(mapStateToProps)(HelpDef);
