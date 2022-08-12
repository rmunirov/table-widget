import React, { FC, useState } from 'react';
import { SortOffIcon, SortOnIcon } from '../../../../../remote-assets';
import { TableHeaderType } from '../../../../../typings/types';
import { Button, Header, Title, Wrapper, Image } from './data-table-header-item.styles';

type PropsType = {
    header: TableHeaderType;
    methods: Array<string>;
    isActive: boolean;
    onSort: (value: string, method: string) => void;
};

const TableHeaderItem: FC<PropsType> = ({ header, methods, isActive, onSort }) => {
    const [ASC, DESC] = methods;
    const [method, setMethod] = useState(ASC);

    const handleClick = () => {
        setMethod(method === ASC ? DESC : ASC);
        onSort(header.value, method);
    };

    return (
        <Header>
            <Wrapper>
                <Title>{header.label}</Title>
                {header.withSort && (
                    <Button onClick={handleClick}>
                        <Image src={isActive ? SortOnIcon : SortOffIcon} />
                    </Button>
                )}
            </Wrapper>
        </Header>
    );
};

export default TableHeaderItem;
