import * as React from 'react';
import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';

export interface NextButtonProps {
    locale: Locale;
}

const NextButtonDef: React.SFC<NextButtonProps> = (props) => (
    <Button
        type='submit'
        style='primary'
        id='pay-btn'>
        {props.locale['form.button.next.label']}
    </Button>
);

export const NextButton = NextButtonDef;
