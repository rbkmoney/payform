import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as styles from './result-form.scss';
import { FormName, ModalForms, ModalName, State, ResultFormInfo, ResultState } from 'checkout/state';
import { setResult, setViewInfoHeight, setViewInfoInProcess } from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { findNamed } from 'checkout/utils';
import { makeContent } from './make-content';
import { ActionBlock } from './action-block';

class ResultFormDef extends React.Component<ResultFormProps> {

    componentDidMount() {
        this.props.setViewInfoInProcess(false);
        this.props.hasMultiMethods
            ? this.props.setViewInfoHeight(425)
            : this.props.setViewInfoHeight(392);
    }

    render() {
        const {header, description, icon, hasActions, hasDone} = makeContent(
            this.props.resultFormInfo,
            this.props.locale,
            this.props.model.invoiceEvents,
            this.props.error
        );
        if (hasDone) {
            this.props.setResult(ResultState.done);
        }
        return (
            <form className={styles.form}>
                <h2 className={styles.title}>{header}</h2>
                {icon}
                {description ? description : false}
                {hasActions ? <ActionBlock/> : false}
            </form>
        );
    }
}

const mapStateToProps = (state: State) => {
    const info = (findNamed(state.modals, ModalName.modalForms) as ModalForms).formsInfo;
    return {
        model: state.model,
        config: state.config,
        locale: state.config.locale,
        error: state.error ? state.error.error : null,
        resultFormInfo: findNamed(info, FormName.resultForm) as ResultFormInfo,
        hasMultiMethods: !!findNamed(info, FormName.paymentMethods)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setResult: bindActionCreators(setResult, dispatch),
    setViewInfoInProcess: bindActionCreators(setViewInfoInProcess, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch)
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
