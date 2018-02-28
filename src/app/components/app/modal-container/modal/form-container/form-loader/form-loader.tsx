import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { appear, exit, loader } from './form-loader.scss';
import { Loader } from 'checkout/components';

export const FormLoader: React.SFC = () => (
    <CSSTransition
        classNames={{enter: null, appear, exit}}
        transitionEnter={false}
        transitionAppear={true}
        timeout={{enter: 500, exit: 200}}>
        <div key='form-loader' className={loader} id='form-loader'>
            <Loader/>
        </div>
    </CSSTransition>
);
