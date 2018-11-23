import * as React from 'react';
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

import { Marks } from './marks';
import { default as styled, css } from 'checkout/styled-components';
import { ReactNode } from 'react';

const Icon = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin: 15px 0 15px 15px;
    width: 19px;
    height: 18px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    opacity: 1;
`;

const StyledInput = styled.input`
    margin: 0;
    width: 100%;
    height: 48px;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid ${({ theme }) => theme.color.neutral[0.2]};
    box-shadow: 0 0 0 0 #fff;
    font-weight: 500;
    font-size: 16px;
    color: ${({ theme }) => theme.color.neutral[0.9]};
    letter-spacing: 0;
    padding-left: 40px;
    padding-right: 13px;
    appearance: none;
    transition: border-color 0.3s;
    outline: none;

    ::placeholder {
        color: ${({ theme }) => theme.color.neutral[0.3]};
    }

    :focus {
        border-color: ${({ theme }) => theme.color.focus[1]} !important;
        border-width: 2px !important;
        box-shadow: 0 0 4px 0 ${({ theme }) => theme.color.focus[1]} !important;
        padding-left: 39px;
        padding-right: 12px;
    }
`;

export interface CustomProps {
    icon?: ReactNode;
    placeholder?: string;
    mark?: boolean; // TODO mark always true
    className?: string;
    type?: 'text' | 'number' | 'value' | 'tel' | 'email' | 'password';
    id?: string;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

type InputProps = WrappedFieldInputProps & WrappedFieldMetaProps & CustomProps;

export const Input = styled<React.FC<InputProps>>((props) => (
    <div className={props.className}>
        {!!props.icon && <Icon>{props.icon}</Icon>}
        <StyledInput
            onChange={props.onChange}
            onBlur={props.onBlur}
            onFocus={props.onFocus}
            onDrop={props.onDrop}
            onDragStart={props.onDragStart}
            onInput={props.onInput}
            placeholder={props.placeholder}
            type={props.type}
            value={props.value}
            id={props.id}
        />
        {!!props.mark && <Marks active={props.active} pristine={props.pristine} error={props.error} />}
    </div>
))`
    position: relative;
    width: 100%;

    :nth-child(2) {
        margin-left: 10px;
    }

    ${(props) =>
        !!props.error &&
        css`
            ${StyledInput} {
                border-color: ${props.theme.color.error[1]};
            }
        `};

    ${(props) =>
        !!props.mark &&
        css`
            ${StyledInput} {
                padding-right: 30px;

                :focus {
                    padding-right: 29px;
                }
            }
        `};
`;
