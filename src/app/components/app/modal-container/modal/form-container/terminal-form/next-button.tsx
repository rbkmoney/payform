import * as React from 'react';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import { next_button } from './next-button.scss';

export interface NextButtonProps {
    locale: Locale;
}

const NextButtonDef: React.SFC<NextButtonProps> = (props) => (
    <Button type="submit" style="primary" id="next-btn" className={next_button}>
        {props.locale['form.button.next.label']}
    </Button>
);

export const NextButton = NextButtonDef;
