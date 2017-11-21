import * as React from 'react';
import * as TransitionGroup from 'react-transition-group';
import * as styles from './container.scss';

import {Header, Info, Footer, Form, ThreeDSContainer, ContainerLoader, Close} from '../index';

export class Container extends React.Component {
    static getView(): string {
        switch (window.location.search) {
            case '?view=loading':
                return 'loading';
            case '?view=3ds':
                return '3ds';
            case '?view=default':
            default:
                return 'default';
        }
    }

    render() {
        const CSSTransitionGroup = TransitionGroup.CSSTransitionGroup;
        return (
            <div className={styles.main_container}>
                {Container.getView() === 'loading' ? <ContainerLoader/> : false}
                <CSSTransitionGroup
                    component='div'
                    transitionName={{
                        appear: styles.appearContainer,
                        enter: styles.enterContainer,
                        leave: styles.leaveContainer
                    }}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                    transitionAppearTimeout={1000}
                    transitionAppear={true}
                    transitionEnter={true}
                    transitionLeave={true}
                >
                    {Container.getView() !== 'loading' ?
                        <div className={styles.container}>
                            <Close />
                            {Container.getView() === 'default' ?
                                <CSSTransitionGroup
                                    component='div'
                                    transitionName={{
                                        appear: styles.appearFormContainer,
                                        enter: styles.enterFormContainer,
                                        leave: styles.leaveFormContainer
                                    }}
                                    transitionEnterTimeout={1000}
                                    transitionLeaveTimeout={1000}
                                    transitionAppearTimeout={1000}
                                    transitionAppear={true}
                                    transitionEnter={true}
                                    transitionLeave={true}
                                >
                                    <div className={styles.form_container}>
                                        <Header/>
                                        <Info/>
                                        <Form/>
                                        <Footer/>
                                    </div>
                                </CSSTransitionGroup>
                                : false}
                            {Container.getView() === '3ds' ? <ThreeDSContainer/> : false}
                        </div>
                        : false
                    }
                    {Container.getView() !== 'loading' && Container.getView() !== '3ds' ? <Footer/> : false}
                </CSSTransitionGroup>
            </div>

        );
    }
}
