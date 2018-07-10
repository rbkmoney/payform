import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './help.scss';
import { State } from 'checkout/state';
import { Header } from '../header';
import { Locale } from 'checkout/locale';
import { getErrorCodeFromEvents } from '../get-error-code-from-changes';
import * as formStyles from '../form-container.scss';
import { getHelpStep } from './get-help-step';

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
                <Header title={props.locale['form.help.header']}/>
                <p className={formStyles.text}>
                    {text}
                </p>
                <ul className={styles.list}>
                    {steps.map(getHelpStep)}
                </ul>
            </div>
        </form>
    );
};

const mapStateToProps = (s: State) => ({
    errorCode: getErrorCodeFromEvents(s.model, s.config.initConfig.integrationType),
    locale: s.config.locale
});

export const Help = connect(mapStateToProps)(HelpDef);
