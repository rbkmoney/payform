import React from 'react';

class Logo extends React.Component {

    render() {
        return <div className="payform--logo-image" style={{backgroundImage: 'url("' + this.props.logoUrl + '")'}}></div>
    }
}

export default Logo;
