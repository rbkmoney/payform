import React from 'react';

class ErrorPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isShow) {
            return <div className="error-panel">{this.props.message}</div>
        }
        return null;
    }
}

export default ErrorPanel;
