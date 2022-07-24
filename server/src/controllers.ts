import { getDB } from './db';

let db: any = null;

export const connect = async () => {
    db = await getDB();
};

export const getData = async () => {
    try {
        const res = await db.query('SELECT * FROM test_data');
        return res;
    } catch (error) {
        console.log(error);
    }
};
