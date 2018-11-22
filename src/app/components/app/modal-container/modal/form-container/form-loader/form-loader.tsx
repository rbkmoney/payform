import * as React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { appear, leave, loader } from './form-loader.scss';
import { Loader } from 'checkout/components';

export const FormLoader: React.FC = () => (
    <CSSTransitionGroup
        transitionName={{ enter: null, appear, leave }}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={200}>
        <div key="form-loader" className={loader} id="form-loader">
            <Loader />
        </div>
    </CSSTransitionGroup>
);
