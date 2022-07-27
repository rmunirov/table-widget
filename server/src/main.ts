import express from 'express';
import { config } from 'dotenv';
import { conditions, connect, getFilterData, getSortData, getTableColumnNames, getTableData, sortMethods } from './controllers';
import { getResponse } from './utils/common';

// .env
// PORT=4343
// PGHOST='localhost'
// PGUSER='admin'
// PGDATABASE='db_table'
// PGPASSWORD='root'
// PGPORT=5432

config();

connect();

const app = express();

const router = express.Router();

const port = process.env.PORT;

const wait = (req: any, res: any, next: () => void) => {
    setTimeout(next, 3000);
};

const cors = (req: any, res: any, next: () => void) => {
    res.set('Access-Control-Allow-Origin', '*');
    next();
};

router.use(cors);

router.get('/table-data', async (req, res) => {
    const errors: Array<string> = [];
    const data = await getTableData().catch((e) => errors.push(e.message));
    res.send(getResponse(errors, data));
});

router.get('/table-data/sort', async (req, res) => {
    const errors: Array<string> = [];
    if (!req.query.sortBy || !req.query.sortMethod) {
        errors.push('Wrong parameters');
        res.send(getResponse(errors, null));
    } else {
        let data = await getSortData(req.query.sortBy, req.query.sortMethod).catch((e) => errors.push(e.message));
        if (!data) {
            data = [];
        }
        res.send(getResponse(errors, data));
    }
});

router.get('/table-data/filter', async (req, res) => {
    const errors: Array<string> = [];
    if (!req.query.filterBy || !req.query.condition || !req.query.value) {
        errors.push('Wrong parameters');
        res.send(getResponse(errors, null));
    } else {
        let data = await getFilterData(req.query.filterBy, req.query.condition, req.query.value).catch((e) => errors.push(e.message));
        if (!data) {
            data = [];
        }
        res.send(getResponse(errors, data));
    }
});

router.get('/headers', async (req, res) => {
    const errors: Array<string> = [];
    const data = await getTableColumnNames().catch((e) => errors.push(e.message));
    res.send(getResponse(errors, data));
});

router.get('/conditions', async (req, res) => {
    const errors: Array<string> = [];
    res.send(getResponse(errors, conditions));
});

router.get('/sortMethods', async (req, res) => {
    const errors: Array<string> = [];
    res.send(getResponse(errors, sortMethods));
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
