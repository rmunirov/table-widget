import React, { FC, useState } from "react";
import { Button, Head, Title, Wrapper, Image } from "./table-head.styles";
import { SortOffIcon, SortOnIcon } from "./../../../../remote-assets";

type PropsType = {
    title: string;
    withSort?: boolean;
    onSort?: () => void;
};

// TODO добавить тип сортировки, по возростанию и убыванию

const TableHead: FC<PropsType> = ({ title, withSort, onSort }) => {
    const [sorted, setSorted] = useState(false);

    const handleClick = () => {
        onSort();
        setSorted(true);
    };

    return (
        <Head>
            <Wrapper>
                <Title>{title}</Title>
                {withSort && onSort && (
                    <Button onClick={handleClick}>
                        <Image src={sorted ? SortOnIcon : SortOffIcon} />
                    </Button>
                )}
            </Wrapper>
        </Head>
    );
};

export default TableHead;
