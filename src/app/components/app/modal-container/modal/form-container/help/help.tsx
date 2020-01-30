import * as React from 'react';
import { connect } from 'react-redux';

import { State } from 'checkout/state';
import { Header } from '../header';
import { Locale } from 'checkout/locale';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import { NumerableList, ListItem } from 'checkout/components/app/modal-container/modal/form-container/numerable-list';
import { Text } from '../text';

interface HelpDefProps {
    errorCode: keyof Locale['form.help.codes'];
    locale: Locale;
}

const getError = (props: HelpDefProps): { steps: string[]; text: string } => {
    const { errorCode, locale } = props;
    return locale['form.help.codes'][errorCode];
};

const HelpDef: React.FC<HelpDefProps> = (props) => {
    const { text, steps } = getError(props);

    return (
        <form>
            <div>
                <Header title={props.locale['form.help.header']} />
                <Text id="help-form-error">{text}</Text>
                <NumerableList id="help-form-steps">
                    {steps.map((step, i) => (
                        <ListItem number={i + 1} key={i}>
                            {step}
                        </ListItem>
                    ))}
                </NumerableList>
            </div>
        </form>
    );
};

const mapStateToProps = (s: State) => ({
    errorCode: getErrorCodeFromEvents(s.events.events, s.config.initConfig.integrationType),
    locale: s.config.locale
});

export const Help = connect(mapStateToProps)(HelpDef);
