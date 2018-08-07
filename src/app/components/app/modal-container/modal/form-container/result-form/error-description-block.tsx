import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { FormInfo, FormName, HelpFormInfo, State } from 'checkout/state';
import { goToFormInfo } from 'checkout/actions';
import { Locale } from 'checkout/locale';
import { Link } from 'checkout/components/ui/link';

export interface ErrorDescriptionBlockProps {
    locale: Locale;
    goToFormInfo: (formInfo: FormInfo) => any;
}

class ErrorDescriptionBlockDef extends React.Component<ErrorDescriptionBlockProps> {
    render() {
        return (
            <Link className={styles.helpBlock} onClick={() => this.goToHelp()} id="help-btn">
                {this.props.locale['form.final.need.help']}
            </Link>
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

export const ErrorDescriptionBlock = connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorDescriptionBlockDef);
