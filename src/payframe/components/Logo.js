import React from 'react';

class Logo extends React.Component {

    render() {
        return <div className="checkout--logo" style={{backgroundImage: `url(${this.props.logo || '/images/logo.png'})`}} />
    }
}

export default Logo;
