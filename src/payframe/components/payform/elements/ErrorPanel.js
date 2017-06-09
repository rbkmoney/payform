import React from 'react';

class ErrorPanel extends React.Component {

    render() {
        return (
            this.props.visible
                ? <div className="payform--error-panel">{this.props.message}</div>
                : null
        );
    }
}

export default ErrorPanel;
