import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { appear, exit, overlay } from './overlay.scss';

export const Overlay: React.SFC = () => (
    <CSSTransition
        classNames={{enter: null, appear, exit}}
        enter={false}
        appear={true}
        timeout={{enter: 500, exit: 500}}>
        <div key='overlay' className={overlay}/>
    </CSSTransition>
);
