export type TableHeaderType = {
    title: string;
    withSort: boolean;
    onSort: () => void;
};

export type TableDataType = {
    date: Date;
    name: string;
    count: number;
    distance: number;
};