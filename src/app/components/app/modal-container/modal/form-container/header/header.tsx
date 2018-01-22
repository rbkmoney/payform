import { bindActionCreators, Dispatch } from 'redux';
import * as React from 'react';
import { connect } from 'react-redux';
import { FormName, State } from 'src/app/state/index';
import * as formStyles from '../form-container.scss';
import { ChevronBack } from '../chevron-back/index';
import { NavigateDirection, navigateTo } from 'checkout/actions';
import { findInfoWithPrevious } from 'checkout/utils';
import { FormInfo } from 'checkout/state';

export interface HeaderProps {
    infoWithPrevious: FormInfo;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
    title: string;
}

const mapStateToProps = (state: State) => ({
    infoWithPrevious: findInfoWithPrevious(state.modals)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigateTo: bindActionCreators(navigateTo, dispatch)
});

const HeaderDef: React.SFC<HeaderProps> = (props) => (
    <div className={formStyles.header}>
        {props.infoWithPrevious ?
            <ChevronBack
                className={formStyles.back_btn}
                destination={props.infoWithPrevious.previous}
                navigateTo={props.navigateTo}/> : null
        }
        <div className={formStyles.title}>
            {props.title}
        </div>
    </div>
);

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderDef);
