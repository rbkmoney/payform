import React from 'react';
import LogoImage from '../images/logo.png';

class Logo extends React.Component {

    render() {
        return <div className="checkout--logo" style={{backgroundImage: `url(${LogoImage})`}} />
    }
}

export default Logo;
