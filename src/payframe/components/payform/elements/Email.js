import React from 'react';
import {focusClass, errorClass} from './cssClasses';

class Email extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
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
        return <div className="payform--group payform--email">
            <input id="email" type="email" name="email"
                   value={this.props.value}
                   onChange={this.handleChange}
                   onBlur={this.handleChange}
                   ref={(input) => { this.input = input; }}
                   placeholder="Email" autoComplete="on" autoCorrect="no" autoCapitalize="no" spellCheck="no"/>
            <div className="payform--icon">
                <svg fill="#2b2b2b">
                    <path fillRule="evenodd" transform="translate(8, 10)" d="M1.86849119,1.00882648 C1.91231938,1.00300503 1.95704343,1 2.00247329,1 L11.9975267,1 C12.0428075,1 12.0874644,1.00306369 12.1312901,1.00899658 L7,5 L1.86849119,1.00882648 Z M1.05353134,1.67496881 C1.01882906,1.77613675 1,1.88463985 1,1.99754465 L1,9.00245535 C1,9.55338405 1.45576096,10 2.00247329,10 L11.9975267,10 C12.5511774,10 13,9.5536886 13,9.00245535 L13,1.99754465 C13,1.88482573 12.9809217,1.77647338 12.9458895,1.67541927 L7,6.29999999 L1.05353134,1.67496881 Z M2.00585866,0 C0.898053512,0 0,0.900176167 0,1.99201702 L0,9.00798298 C0,10.1081436 0.897060126,11 2.00585866,11 L11.9941413,11 C13.1019465,11 14,10.0998238 14,9.00798298 L14,1.99201702 C14,0.891856397 13.1029399,0 11.9941413,0 L2.00585866,0 Z M2.00585866,0" />
                </svg>
            </div>
        </div>
    }

}

export default Email;
