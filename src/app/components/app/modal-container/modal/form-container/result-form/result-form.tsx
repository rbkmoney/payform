import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './result-form.scss';
import { connect } from 'react-redux';
import { State } from 'checkout/state';
import { FormFlowStatus, getActive } from 'checkout/form-flow';
import {
    changeStepStatus,
    setModel,
    resetStage,
    setFormFlowAction
} from 'checkout/actions';
import { ResultFormProps } from './result-form-props';
import { FormBlock } from './form-block';

const ResultFormDef: React.SFC<ResultFormProps> = (props) => {
    const {active: {status}} = props;
    return (
        <div>
            {status === FormFlowStatus.inProcess ? <div className={styles.loadingSubstrate}/> : false}
            {status === FormFlowStatus.processed ? <FormBlock {...props}/> : false}
        </div>
    );
};

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow,
    active: getActive(state.formsFlow),
    model: state.model,
    locale: state.config.locale,
    initConfig: state.config.initConfig,
    cardForm: state.form.cardForm
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch),
    resetStage: bindActionCreators(resetStage, dispatch),
    changeStepStatus: bindActionCreators(changeStepStatus, dispatch),
    setModel: bindActionCreators(setModel, dispatch),
});

export const ResultForm = connect(mapStateToProps, mapDispatchToProps)(ResultFormDef);
