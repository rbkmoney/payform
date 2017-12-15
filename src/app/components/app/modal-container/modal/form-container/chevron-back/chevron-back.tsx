import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as formStyles from '../form-container.scss';
import { setFormFlowAction, SetFormsFlowAction } from 'checkout/actions';
import { State } from 'checkout/state';
import { Icon, IconType } from 'checkout/components';
import { back, hasBack, FormFlowItem } from 'checkout/form-flow';

export interface ChevronBackProps {
    formsFlow: FormFlowItem[];
    setFormFlow: (formFlow: FormFlowItem[]) => SetFormsFlowAction;
}

const mapStateToProps = (state: State) => ({
    formsFlow: state.formsFlow
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setFormFlow: bindActionCreators(setFormFlowAction, dispatch)
});

class ChevronBackDef extends React.Component<ChevronBackProps> {

    constructor(props: ChevronBackProps) {
        super(props);
        this.back = this.back.bind(this);
    }

    back() {
        this.props.setFormFlow(back(this.props.formsFlow));
    }

    render() {
        return (
            hasBack(this.props.formsFlow) ?
                <div className={formStyles.back_btn} onClick={this.back}>
                    <Icon icon={IconType.chevronLeft}/>
                </div> : null
        );
    }
}

export const ChevronBack = connect(mapStateToProps, mapDispatchToProps)(ChevronBackDef);
