import * as React from 'react';

import styled from 'checkout/styled-components';
import { css } from 'checkout/styled-components';

type ButtonType = 'primary' | 'default';

export const Button = styled.button<{ color?: ButtonType }>`
    color: ${({ theme }) => theme.color.secondary[0.9]};
    background: #fff;
    text-align: center;
    border-radius: 4px;
    padding: 12px;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 20px;
    transition: all 0.3s;
    cursor: pointer;
    width: 100%;
    outline: none;
    border: 2px solid ${({ theme }) => theme.color.secondary[0.9]};

    ${({ theme, color }) =>
        color === 'primary'
            ? css`
                  border-radius: 32px;
                  color: #fff;
                  border-color: ${theme.color.primary[1]};
                  background: ${theme.color.primary[1]};

                  :hover {
                      background: ${theme.color.primary[0.8]};
                      border-color: ${theme.color.primary[0.8]};
                  }

                  :active {
                      background: ${theme.color.primary[0.9]};
                      border-color: ${theme.color.primary[0.9]};
                  }
              `
            : css`
                  :hover,
                  :active {
                      border-color: ${theme.color.secondary[0.8]};
                  }

                  :active {
                      color: ${theme.color.secondary[0.8]};
                  }
              `};
`;
