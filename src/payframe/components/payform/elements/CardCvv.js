import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCardCvvVal } from '../../../../redux/actions/viewDataActions';
import CardUtils from '../../../../utils/card-utils/CardUtils';
import { focusClass, errorClass } from './cssClasses';
import isIE from '../../../../utils/isIE';

class CardCvv extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        CardUtils.formatCardCvv(this.input);
        const classList = this.input.parentNode.classList;
        this.input.onfocus = () => classList.add(focusClass);
        this.input.onblur = () => classList.remove(focusClass);
        this.input.value = this.props.cardCvv.value;
    }

    componentWillReceiveProps(nextProps) {
        const classList = this.input.parentNode.classList;
        if (nextProps.cardCvv.valid === false) {
            classList.add(errorClass);
        } else {
            classList.remove(errorClass);
        }
    }

    handleChange(event) {
        this.props.actions.setCardCvvVal(event.target.value);
    }

    render() {
        return <div className="payform--group payform--card-cvc">
            <input
                id="cvv"
                type="tel"
                name="cvv"
                onChange={this.handleChange}
                onKeyUp={isIE ? this.handleChange : false}
                ref={(input) => {
                    this.input = input;
                }}
                placeholder={this.props.locale['input.payment.cardCVV.placeholder']}
                autoComplete="off"
                autoCorrect="no"
                autoCapitalize="no"
                spellCheck="no"
                maxLength="4"/>
            <div className="payform--icon">
                <svg fill="#2b2b2b" focusable="false">
                    <path
                        fillRule="evenodd"
                        transform="translate(9, 9)"
                        d="M8.8,4 C8.8,1.79086089 7.76640339,4.18628304e-07 5.5,0 C3.23359661,-4.1480896e-07 2.2,1.79086089 2.2,4 L3.2,4 C3.2,2.34314567 3.81102123,0.999999681 5.5,1 C7.18897877,1.00000032 7.80000001,2.34314567 7.80000001,4 L8.8,4 Z M1.99201702,4 C0.891856397,4 0,4.88670635 0,5.99810135 L0,10.0018986 C0,11.1054196 0.900176167,12 1.99201702,12 L9.00798298,12 C10.1081436,12 11,11.1132936 11,10.0018986 L11,5.99810135 C11,4.89458045 10.0998238,4 9.00798298,4 L1.99201702,4 Z M1.99754465,5 C1.44661595,5 1,5.45097518 1,5.99077797 L1,10.009222 C1,10.5564136 1.4463114,11 1.99754465,11 L9.00245535,11 C9.55338405,11 10,10.5490248 10,10.009222 L10,5.99077797 C10,5.44358641 9.5536886,5 9.00245535,5 L1.99754465,5 Z M1.99754465,5"/>
                </svg>
            </div>
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
        cardCvv: state.viewData.cardForm.cardCvv
    };
}

function mapActionsToProps(dispatch) {
    return {
        actions: {
            setCardCvvVal: bindActionCreators(setCardCvvVal, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapActionsToProps)(CardCvv);
