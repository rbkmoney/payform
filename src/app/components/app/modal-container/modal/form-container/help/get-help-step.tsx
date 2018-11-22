import * as React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    position: relative;
    margin-bottom: 20px;
    font-size: 16px;
    color: ${({ theme }) => theme.color.neutral[0.9]};
    letter-spacing: 0;
    line-height: 20px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ListItemNumber = styled.div`
    display: inline-block;
    margin-right: 15px;
    color: ${({ theme }) => theme.color.secondary[1]};
`;

const ListItemText = styled.div`
    display: inline-block;
`;

export const getHelpStep = (step: string, i: number): JSX.Element => (
    <ListItem key={i}>
        <ListItemNumber>{i + 1}</ListItemNumber>
        <ListItemText>{step}</ListItemText>
    </ListItem>
);
