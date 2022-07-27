import React, { FC, useState } from 'react';
import { Button, Head, Title, Wrapper, Image } from './table-head.styles';
import { SortOffIcon, SortOnIcon } from './../../../../remote-assets';
import { TableHeaderType } from '../../../../typings/types';

type PropsType = {
    header: TableHeaderType;
    methods: Array<string>;
    isActive: boolean;
};

const TableHead: FC<PropsType> = ({ header, methods, isActive }) => {
    const [ASC, DESC] = methods;
    const [method, setMethod] = useState(ASC);

    const handleClick = () => {
        header.onSort(header.value, method);
        setMethod(method === ASC ? DESC : ASC);
    };

    return (
        <Head>
            <Wrapper>
                <Title>{header.label}</Title>
                {header.withSort && (
                    <Button onClick={handleClick}>
                        <Image src={isActive ? SortOnIcon : SortOffIcon} />
                    </Button>
                )}
            </Wrapper>
        </Head>
    );
};

export default TableHead;
