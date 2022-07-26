import { getDB } from './db';

let db: any = null;

export const connect = async () => {
    db = await getDB();
};

enum ConditionNames {
    EQUAL = 'EQUAL',
    CONTAIN = 'CONTAIN',
    GREATER = 'GREATER',
    LESS = 'LESS',
}

export const conditions = [
    { value: ConditionNames.EQUAL, label: 'Равно', symbol: '=' },
    { value: ConditionNames.CONTAIN, label: 'Содержит', symbol: 'LIKE' },
    { value: ConditionNames.GREATER, label: 'Больше', symbol: '>' },
    { value: ConditionNames.LESS, label: 'Меньше', symbol: '<' },
];

export const headers = [
    { value: 'date', label: 'Дата' },
    { value: 'name', label: 'Название' },
    { value: 'count', label: 'Количество' },
    { value: 'distance', label: 'Расстояние' },
];

export const sortMethods = ['ASC', 'DESC'];

/** Query handler */
const handleQuery = async (queryText: string) => {
    if (db === null) {
        throw new Error('no db connection');
    }
    try {
        const res = await db.query(queryText);
        return res.rows;
    } catch (error) {
        console.log(error);
    }
};

/** Get table data */
export const getTableData = async () => {
    const text = 'SELECT * FROM test_data';
    return await handleQuery(text);
};

/** Get table column names */
export const getTableColumnNames = async () => {
    // const text = "SELECT column_name as header FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'test_data'";
    // const names = await handleQuery(text);
    // // delete 'id' column
    // names.splice(0, 1);

    // const findLabel = (header: string) => {
    //     return headers.find((item) => item.value === header)?.label;
    // };

    // return names.map((item: { header: string }) => {
    //     return { value: item.header, label: findLabel(item.header) };
    // });
    return headers;
};

/** Sort table data by name */
export const getSortData = async (column: any, method: any) => {
    if (!headers.find((item) => item.value === column)) {
        throw new Error('column is not defined');
    }

    if (!sortMethods.includes(method)) {
        throw new Error('sort method is not defined');
    }

    const text = 'SELECT * FROM test_data ORDER BY' + ' ' + column + ' ' + method;
    return await handleQuery(text);
};

/** Filter table data by passed parameters */
export const getFilterData = async (column: any, condition: any, value: any) => {
    const cond = conditions.find((item) => item.value === condition);
    if (!cond) {
        throw new Error('condition is not defined');
    }

    if (!headers.find((item) => item.value === column)) {
        throw new Error('column is not defined');
    }

    let valueCopy = value;
    let columnCopy = column;

    if (condition === ConditionNames.CONTAIN) {
        valueCopy = '\'%' + value + '%\'';
        columnCopy = column + '::text';
    }

    const text = 'SELECT * FROM test_data WHERE' + ' ' + columnCopy + ' ' + cond.symbol + ' ' + valueCopy;
    console.log(text);
    return await handleQuery(text);
};
