export type TableHeaderType = {
    value: string;
    label: string;
    withSort: boolean;
    onSort: (value: string, method: string) => void;
};

export type TableDataType = {
    date: Date;
    name: string;
    count: number;
    distance: number;
};
