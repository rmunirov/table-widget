import React, { FC } from 'react';
import { Item, ItemActive, ItemDisabled, Wrapper } from './pagination-item.styles';

type PropsType = {
    value?: number;
    isActive?: boolean;
    isDisabled?: boolean;
    onClick?: (value?: number) => void;
    mode?: 'next' | 'prev' | 'pick' | 'ellipsis';
};

const PaginationItem: FC<PropsType> = ({ value, isActive, isDisabled, onClick, mode = 'pick' }) => {
    const handler = () => {
        if (onClick) {
            onClick(value);
        }
    };

    let title = String(value);
    if (mode === 'next') {
        title = '>';
    }
    if (mode === 'prev') {
        title = '<';
    }
    if (mode === 'ellipsis') {
        title = '...';
    }

    let item = <Item onClick={handler}>{title}</Item>;
    if (isDisabled) {
        item = (
            <ItemDisabled onClick={handler} disabled>
                {title}
            </ItemDisabled>
        );
    } else if (isActive) {
        item = <ItemActive onClick={handler}>{title}</ItemActive>;
    }

    return <Wrapper>{item}</Wrapper>;
};

export default PaginationItem;
