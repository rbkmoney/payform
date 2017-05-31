import React from 'react';
import CardUtils from '../../../../utils/card-utils/CardUtils';
import {focusClass, errorClass} from './cssClasses';
import isIE from '../../../../utils/isIE';

class CardNumber extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        CardUtils.formatCardNumber(this.input);
        const classList = this.input.parentNode.classList;
        this.input.onfocus = () => classList.add(focusClass);
        this.input.onblur = () => classList.remove(focusClass);
    }

    componentWillReceiveProps(props) {
        const classList = this.input.parentNode.classList;
        if (props.isValid === false) {
            classList.add(errorClass);
        } else {
            classList.remove(errorClass);
        }
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        return <div className="payform--group payform--card-number">
            <input id="card-number" type="tel" name="card-number"
                   value={this.props.value}
                   onChange={this.handleChange}
                   onKeyUp={isIE ? this.handleChange : false}
                   ref={(input) => { this.input = input; }}
                   placeholder="Card number" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
            <div className="payform--icon">
                <svg fill="#2b2b2b">
                    <path fillRule="evenodd" transform="translate(8, 10)" d="M2.00585866,0 C0.898053512,0 0,0.900176167 0,1.99201702 L0,9.00798298 C0,10.1081436 0.897060126,11 2.00585866,11 L11.9941413,11 C13.1019465,11 14,10.0998238 14,9.00798298 L14,1.99201702 C14,0.891856397 13.1029399,0 11.9941413,0 L2.00585866,0 Z M2.00247329,1 C1.44882258,1 1,1.4463114 1,1.99754465 L1,9.00245535 C1,9.55338405 1.45576096,10 2.00247329,10 L11.9975267,10 C12.5511774,10 13,9.5536886 13,9.00245535 L13,1.99754465 C13,1.44661595 12.544239,1 11.9975267,1 L2.00247329,1 Z M1,3 L1,5 L13,5 L13,3 L1,3 Z M11,8 L11,9 L12,9 L12,8 L11,8 Z M9,8 L9,9 L10,9 L10,8 L9,8 Z M9,8" />
                </svg>
            </div>
        </div>
    }
}

export default CardNumber;
