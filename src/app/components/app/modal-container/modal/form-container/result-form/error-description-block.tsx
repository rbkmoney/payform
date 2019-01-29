import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { FormInfo, FormName, HelpFormInfo, State } from 'checkout/state';
import { goToFormInfo } from 'checkout/actions';
import { Locale } from 'checkout/locale';
import { Link } from 'checkout/components/ui/link';
import styled from 'checkout/styled-components';

const HelpBlock = styled(Link)`
    margin: 0 auto 25px auto;
`;

export interface ErrorDescriptionBlockProps {
    locale: Locale;
    goToFormInfo: (formInfo: FormInfo) => any;
}

class ErrorDescriptionBlockDef extends React.Component<ErrorDescriptionBlockProps> {
    render() {
        return (
            <HelpBlock onClick={() => this.goToHelp()} id="help-btn">
                {this.props.locale['form.final.need.help']}
            </HelpBlock>
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
