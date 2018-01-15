import * as React from 'react';
import { connect } from 'react-redux';
import * as styles from './mobile-header.scss';
import * as cx from 'classnames';
import { InitConfig } from 'checkout/config';
import { State } from 'checkout/state';

export interface MobileHeaderProps {
    initConfig: InitConfig;
}

const mapStateToProps = (state: State) => ({
    initConfig: state.config.initConfig,
});

class MobileHeaderDef extends React.Component<MobileHeaderProps> {

    constructor(props: MobileHeaderProps) {
        super(props);
        this.back = this.back.bind(this);
    }

    back(e: Event) {
        e.preventDefault();
    }

    render() {
        return (
            <header className={styles.header}>
                {/*{hasBack(this.props.formsFlow) ? (*/}
                    {/*<button className={styles.back_btn} onClick={this.back as any}>*/}
                        {/*<ChevronIcon/>*/}
                    {/*</button>*/}
                {/*) : false}*/}
                <div className={cx(styles.text, {[styles._center]: true})}>
                    {this.props.initConfig.name}
                </div>
            </header>
        );
    }
}

export const MobileHeader = connect(mapStateToProps)(MobileHeaderDef);
