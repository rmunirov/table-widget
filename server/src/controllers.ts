import { getDB } from './db';

let db: any = null;

export const connect = async () => {
    db = await getDB();
};

export const getTableData = async () => {
    if (db === null) {
        throw new Error('no db connection');
    }
    try {
        const res = await db.query('SELECT * FROM test_data');
        return res.rows;
    } catch (error) {
        console.log(error);
    }
};
