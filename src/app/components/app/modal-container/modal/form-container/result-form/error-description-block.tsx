import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as cx from 'classnames';
import * as styles from './result-form.scss';
import * as formStyles from '../form-container.scss';
import { FormInfo, FormName, HelpFormInfo, State } from 'checkout/state';
import { goToFormInfo } from 'checkout/actions';
import { Locale } from 'checkout/locale';

export interface ErrorDescriptionBlockProps {
    locale: Locale;
    goToFormInfo: (formInfo: FormInfo) => any;
}

class ErrorDescriptionBlockDef extends React.Component<ErrorDescriptionBlockProps> {

    render() {
        return (
            <div className={cx(formStyles.link_container, styles.helpBlock)}>
                <a className={formStyles.link} onClick={() => this.goToHelp()}>
                    {this.props.locale['form.final.need.help']}
                </a>
                <hr/>
            </div>
        );
    }

    private goToHelp() {
        this.props.goToFormInfo(new HelpFormInfo(FormName.resultForm));
    }
}

const mapStateToProps = (state: State) => ({
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    goToFormInfo: bindActionCreators(goToFormInfo, dispatch)
});

export const ErrorDescriptionBlock = connect(mapStateToProps, mapDispatchToProps)(ErrorDescriptionBlockDef);
