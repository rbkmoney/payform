import React from 'react';
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class Overlay extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName='checkout--overlay'
                transitionAppear={true}
                transitionAppearTimeout={300}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="checkout--overlay">
                    {!this.props.loader ?
                        <div className="loading">
                            <div className="rect1" />
                            <div className="rect2" />
                            <div className="rect3" />
                            <div className="rect4" />
                            <div className="rect5" />
                        </div>
                    :
                        false
                    }
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}