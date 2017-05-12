import React from 'react';
import CardUtils from '../../../../utils/card-utils/CardUtils';
import {focusClass, errorClass} from './cssClasses';

class CardExpire extends React.Component {
    componentDidMount() {
        CardUtils.formatCardExpiry(this.input);
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

    render() {
        return (
            <div className="payform--card-expire">
                <input id="exp-date" type="tel" name="exp-date"
                       ref={(input) => { this.input = input; }}
                       placeholder="MM / YY" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"
                />
                <div className="payform--icon">
                    <svg fill="#2b2b2b">
                        <path fillRule="evenodd" transform="translate(8, 9)" d="M2.0085302,1 C0.899249601,1 0,1.90017617 0,2.99201702 L0,10.007983 C0,11.1081436 0.901950359,12 2.0085302,12 L9.9914698,12 C11.1007504,12 12,11.0998238 12,10.007983 L12,2.99201702 C12,1.8918564 11.0980496,1 9.9914698,1 L2.0085302,1 Z M1.99539757,4 C1.44565467,4 1,4.43788135 1,5.00292933 L1,9.99707067 C1,10.5509732 1.4556644,11 1.99539757,11 L10.0046024,11 C10.5543453,11 11,10.5621186 11,9.99707067 L11,5.00292933 C11,4.44902676 10.5443356,4 10.0046024,4 L1.99539757,4 Z M3,1 L3,2 L4,2 L4,1 L3,1 Z M8,1 L8,2 L9,2 L9,1 L8,1 Z M3,0 L3,1 L4,1 L4,0 L3,0 Z M8,0 L8,1 L9,1 L9,0 L8,0 Z M8,0" />
                    </svg>
                </div>
            </div>
        );

    }
}

export default CardExpire;
