import React from 'react';

class Logo extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.input.style.backgroundImage = 'url("' + this.props.logoUrl + '")';
    }

    render() {
        return <div className="payform--logo-image" ref={(input) => { this.input = input; }}></div>
    }
}

export default Logo;
