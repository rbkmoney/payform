import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './help.scss';
import { ModelState, State } from 'checkout/state';
import { Header } from '../header';
import { Locale } from 'checkout/locale';
import { getErrorFromEvents } from '../get-error-from-changes';
import * as formStyles from '../form-container.scss';

interface HelpDefProps {
    model: ModelState;
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
                        {steps.map(this.renderStep)}
                    </ul>
                </div>
            </form>
        );
    }

    private renderStep(step: string, i: number) {
        return (
            <li className={styles.list_item} key={i}>
                <div className={styles.list_item_number}>
                    {i + 1}
                </div>
                <div className={styles.list_item_text}>
                    {step}
                </div>
            </li>
        );
    }

    private getError() {
        const { model, locale } = this.props;
        const errorCode = model.customerEvents ? getErrorFromEvents(model.customerEvents) : getErrorFromEvents(model.invoiceEvents);
        return locale['form.help'][errorCode];
    }
}

const mapStateToProps = (state: State) => ({
    model: state.model,
    locale: state.config.locale
});

export const Help = connect(mapStateToProps)(HelpDef);
