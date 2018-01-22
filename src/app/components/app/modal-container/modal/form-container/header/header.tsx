import * as React from 'react';
import { connect } from 'react-redux';
import { Locale } from 'src/locale/locale';
import { FormName, State } from 'src/app/state/index';
import * as formStyles from '../form-container.scss';
import { ChevronBack } from '../chevron-back/index';
import { bindActionCreators, Dispatch } from 'redux';
import {NavigateDirection, navigateTo} from 'checkout/actions';
import {toActiveFormName, toPrevious} from 'checkout/utils';

export interface HeaderProps {
    previous: FormName;
    locale: Locale;
    navigateTo: (formName: FormName, direction: NavigateDirection) => any;
    title: string;
}

const mapStateToProps = (state: State) => ({
    previous: toPrevious(state.modals, toActiveFormName(state.modals)),
    locale: state.config.locale
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigateTo: bindActionCreators(navigateTo, dispatch)
});

const HeaderDef: React.SFC<HeaderProps> = (props) => (
    <div className={formStyles.header}>
        {props.previous ? <ChevronBack className={formStyles.back_btn} destination={props.previous} navigateTo={props.navigateTo} /> : null}
        <div className={formStyles.title}>
            {props.title}
        </div>
    </div>
);

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderDef);
