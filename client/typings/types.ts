export type TableHeaderType = {
    value: string;
    label: string;
    withSort: boolean;
};

export type TableDataType = {
    id: number;
    date: Date;
    name: string;
    count: number;
    distance: number;
};

export type ConditionType = {
    value: string;
    label: string;
    symbol: string;
};

export type ParamsBodyType = {
    conditions: Array<ConditionType>;
    headers: Array<TableHeaderType>;
    sortMethods: Array<string>;
};

export type ParamsType = {
    success: boolean;
    body: ParamsBodyType;
    errors: Array<string>;
};
