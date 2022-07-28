import express from 'express';
import { config } from 'dotenv';
import { connect, getAllData, getParams, getQueryData } from './controllers';
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

router.use(cors, wait);

router.get('/table-data', async (req, res) => {
    const errors: Array<string> = [];
    const sortBy = req.query.sortBy as string;
    const sortMethod = req.query.sortMethod as string;
    const filterBy = req.query.filterBy as string;
    const filterCond = req.query.condition as string;
    const filterVal = req.query.value as string;

    if (!sortBy || !sortMethod) {
        const data = await getAllData().catch((e) => errors.push(e.message));
        res.send(getResponse(errors, data));
    } else {
        const data = await getQueryData(sortBy, sortMethod, filterBy, filterCond, filterVal).catch((e) => errors.push(e.message));
        res.send(getResponse(errors, data));
    }
});

router.get('/params', async (req, res) => {
    const errors: Array<string> = [];
    const data = await getParams().catch((e) => errors.push(e.message));
    res.send(getResponse(errors, data));
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
