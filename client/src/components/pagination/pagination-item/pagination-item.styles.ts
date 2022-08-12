import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Wrapper = styled('div')`
    display: flex;
    margin: 0 5px;
    width: 40px;
`;

const active = css`
    border-radius: 20px;
    background: grey;
    cursor: pointer;
`;

const base = css`
    padding: 10px 15px;
    border-radius: 20px;
    border: none;
    background: white;
`;

export const Item = styled('button')`
    ${base}
    &:hover {
        ${active}
    }
`;

export const ItemActive = styled('button')`
    ${base}
    background: grey;
    &:hover {
        ${active}
    }
`;

export const ItemDisabled = styled('button')`
    ${base}
`;
