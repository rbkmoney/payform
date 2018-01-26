import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, overlay } from './overlay.scss';

export const Overlay: React.SFC = () => (
    <CSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={overlay}/>
    </CSSTransitionGroup>
);
