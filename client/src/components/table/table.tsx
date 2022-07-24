import React from 'react';
import { Head, Data, Row, Table, Wrapper } from './table.style';

const TableComponent = () => {
    return (
        <Wrapper>
            <Table>
                <Row>
                    <Head>Дата</Head>
                    <Head>Название</Head>
                    <Head>Количество</Head>
                    <Head>Расстояние</Head>
                </Row>
                <Row>
                    <Data>123</Data>
                    <Data>123</Data>
                    <Data>123</Data>
                    <Data>123</Data>
                </Row>
            </Table>
        </Wrapper>
    );
};

export default TableComponent;
