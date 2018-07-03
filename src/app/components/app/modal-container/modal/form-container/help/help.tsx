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
        return (
            <form>
                <div>
                    <Header title={this.props.locale['form.help.header']}/>
                    <p className={formStyles.text}>
                        {this.getSteps()[0]}
                    </p>
                    <ul className={styles.list}>
                        {this.getSteps().map(this.renderStep)}
                    </ul>
                </div>
            </form>
        );
    }

    private renderStep(step: string, i: number) {
        if (i > 0) {
            return (
                <li className={styles.list_item} key={i}>
                    <div className={styles.list_item_number}>
                        {i}
                    </div>
                    <div className={styles.list_item_text}>
                        {step}
                    </div>
                </li>
            );
        } else {
            return false;
        }
    }

    private getSteps() {
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
