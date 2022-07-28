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
    { value: 'date', label: 'Дата', withSort: false },
    { value: 'name', label: 'Название', withSort: true },
    { value: 'count', label: 'Количество', withSort: true },
    { value: 'distance', label: 'Расстояние', withSort: true },
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
export const getAllData = async () => {
    const text = 'SELECT * FROM test_data';
    return await handleQuery(text);
};

/** Get table column names */
export const getTableColumnNames = async () => {
    return headers;
};

/** Get data with sort and filter */
export const getQueryData = async (sortBy: string, sortMethod: string, filterBy: string, filterCond: string, filterVal: string) => {
    if (!headers.find((item) => item.value === sortBy)) {
        throw new Error('column is not defined');
    }

    if (!sortMethods.includes(sortMethod)) {
        throw new Error('sort method is not defined');
    }

    const condition = conditions.find((item) => item.value === filterCond);
    if (!condition && filterVal) {
        throw new Error('condition is not defined');
    }

    if (!headers.find((item) => item.value === filterBy) && filterVal) {
        throw new Error('column is not defined');
    }

    if (!filterVal) {
        const text = 'SELECT * FROM test_data ORDER BY' + ' ' + sortBy + ' ' + sortMethod;
        return await handleQuery(text);
    }

    let valueCopy = "'" + filterVal + "'";
    let filterByCopy = filterBy + '::text';

    if (filterCond === ConditionNames.CONTAIN) {
        valueCopy = "'%" + filterVal + "%'";
    }

    const text =
        'SELECT * FROM test_data WHERE' +
        ' ' +
        filterByCopy +
        ' ' +
        condition.symbol +
        ' ' +
        valueCopy +
        'ORDER BY' +
        ' ' +
        sortBy +
        ' ' +
        sortMethod;
    return await handleQuery(text);
};
