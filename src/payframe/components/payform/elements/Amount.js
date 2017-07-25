import React from 'react';
import cx from 'classnames';
import {focusClass, errorClass} from './cssClasses';
import formatCurrency from '../../../../utils/formatCurrency';
import currencyFormatter from 'currency-formatter';
import isIE from '../../../../utils/isIE';
import getPlaceholderClass from './getPlaceholderClass';

class Amount extends React.Component {
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

    getPlaceholder() {
        if (this.props.template && this.props.template.cost.range) {
            return `${formatCurrency(this.props.template.cost.range.lowerBound / 100, this.props.currency)} - ${formatCurrency(this.props.template.cost.range.upperBound / 100, this.props.currency)}`;
        } else {
            return `${this.props.locale['input.payment.amount.placeholder']} ${currencyFormatter.findCurrency(this.props.currency).symbol}`;
        }
    }

    render() {
        return <div className={cx('payform--group payform--amount', placeholderSize(this.getPlaceholder()))}>
            <input id="amount" type="number" name="amount"
                   value={this.props.value}
                   onChange={this.handleChange}
                   onKeyUp={isIE ? this.handleChange : false}
                   ref={(input) => { this.input = input; }}
                   placeholder={this.getPlaceholder()}
                   autoComplete="off"
                   autoCorrect="no"
                   autoCapitalize="no"
                   spellCheck="no"/>
            <div className="payform--icon">
                <svg x="0px" y="0px" viewBox="0 0 512 512">
                    <g>
                        <g>
                            <path d="M506.032,276.401h-30.13v-47.595c0-32.774-24.386-59.945-55.964-64.359l-23.581-86.222l-21.567,5.898L310.054,0
                            L104.767,157.973l-21.329,5.834H70.969c-35.842,0-65.001,29.16-65.001,65.001v218.191C5.967,482.84,35.127,512,70.969,512h339.933
                            c35.842,0,65.001-29.16,65.001-65.001v-47.595h30.13V276.401H506.032z M385.592,163.806H208.376l164.883-45.094L385.592,163.806z
                            M304.035,46.22l36.398,47.299l-151.824,41.524L304.035,46.22z M442.942,446.999c0,17.668-14.373,32.043-32.043,32.043H70.967
                            c-17.668,0-32.043-14.373-32.043-32.043V228.807c0-17.668,14.373-32.043,32.043-32.043H410.9
                            c17.668,0,32.043,14.373,32.043,32.043v47.595h-127.4v123.002h127.399V446.999z M473.073,366.445H348.502V309.36h124.571V366.445z
                            "/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <circle cx="380.476" cy="337.905" r="12.711"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>
    }
}

export default Amount;