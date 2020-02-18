import * as React from 'react';

import { Button } from 'checkout/components';
import { Locale } from 'checkout/locale';
import styled from 'checkout/styled-components';

export interface NextButtonProps {
    locale: Locale;
}

export const StyledButton = styled(Button)`
    margin-top: 20px;
`;

export const NextButton: React.FC<NextButtonProps> = (props) => (
    <StyledButton type="submit" color="primary" id="next-btn">
        {props.locale['form.button.next.label']}
    </StyledButton>
);
