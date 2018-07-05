import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './help.scss';
import { State } from 'checkout/state';
import { Header } from '../header';
import { Locale } from 'checkout/locale';
import { getErrorFromEvents } from '../get-error-from-changes';
import * as formStyles from '../form-container.scss';
import { helpStep } from './help-step';

interface HelpDefProps {
    errorCode: string;
    locale: Locale;
}

export class HelpDef extends React.Component<HelpDefProps> {

    render() {
        const { text, steps } = this.getError();
        return (
            <form>
                <div>
                    <Header title={this.props.locale['form.help.header']}/>
                    <p className={formStyles.text}>
                        {text}
                    </p>
                    <ul className={styles.list}>
                        {steps.map(helpStep)}
                    </ul>
                </div>
            </form>
        );
    }

    private getError() {
        const { errorCode, locale } = this.props;
        return locale['form.help.codes'][errorCode];
    }
}

const mapStateToProps = (state: State) => ({
    errorCode: getErrorFromEvents(state.model, state.config.initConfig.integrationType),
    locale: state.config.locale
});

export const Help = connect(mapStateToProps)(HelpDef);
