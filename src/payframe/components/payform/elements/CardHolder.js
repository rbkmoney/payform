import React from 'react';
import {focusClass, errorClass} from './cssClasses';

class CardHolder extends React.Component {
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
        return (
            <div className="payform--group payform--card-holder">
                <input id="card-holder" type="text" name="card-holder"
                       value={this.props.value}
                       onChange={this.handleChange}
                       ref={(input) => { this.input = input; }}
                       placeholder="Card holder" autoComplete="off" autoCorrect="no" autoCapitalize="no" spellCheck="no"
                />
                <div className="payform--icon">
                    <svg fill="#2b2b2b" focusable="false">
                        <path fillRule="evenodd" transform="translate(7, 8)" d="M11.996684,14 C13.0947221,14 14,13.1101744 13.9999999,12.009095 L14,11.1491834 C14.0000003,9.91850391 13.3623813,9.53591084 10.9228899,8.52151991 C9.65809648,7.99559263 9.07889982,7.67070275 9.05789428,7.60696539 C9.0285739,7.51799818 8.87779879,7.81924073 9.56596152,6.74789493 C10.1158583,5.89180439 10.4051134,4.98207687 10.4051136,3.71797921 C10.4051139,1.68118868 9.60051814,0.485608698 8.21363982,0.121696257 C7.80812531,0.0152905441 7.55676223,9.41263804e-05 6.96135352,9.42910654e-05 C5.00856522,9.483119e-05 3.52263311,1.0188016 3.5226329,3.56578315 C3.52263286,4.68755112 3.79796986,5.52392778 4.34876041,6.49138191 C4.94128002,7.53213241 4.94703121,7.54559374 4.90298986,7.76729822 C4.89714459,7.79672334 4.33356436,8.13608721 3.04999838,8.70234264 C0.704440887,9.73710414 0.00773538487,10.1871597 0.0115913123,11.4408697 C0.0122174355,11.6444427 0.0113716658,11.7911179 0.00963390836,11.8891851 C0.00814961188,11.953822 0.00814961188,11.953822 0.00838740291,11.946099 C-0.0102850819,13.0932349 0.880033796,13.9999998 1.99322919,13.9999998 L11.996684,14 Z M1.00716107,11.9956084 C1.00716107,11.9956084 1.01294346,11.8789576 1.01158658,11.4377941 C1.00719768,10.0107946 5.61918235,9.29435064 5.88382455,7.96213996 C6.14846675,6.62992931 4.52263281,5.90956861 4.5226329,3.56578323 C4.52263309,1.22199787 6.15002134,1.00009452 6.96135379,1.00009429 C7.77268624,1.00009407 9.40511407,0.941891089 9.40511362,3.71797904 C9.40511313,6.49406696 7.69616924,6.66991367 8.10814245,7.9199693 C8.52011565,9.17002493 13.0000003,9.84816832 13,11.1491833 L12.9999999,12.0090951 C13,12.5563568 12.5438559,13 11.9966841,13 L1.99322921,12.9999998 C1.43911312,12.9999998 0.998392539,12.5512468 1.00716107,11.9956084 Z M1.00716107,11.9956084" />
                    </svg>
                </div>
            </div>
        );
    }
}

export default CardHolder;
