import express from 'express';
import { config } from 'dotenv';
import { connect, getTableData } from './controllers';
import { getResponse } from './utils/common';

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

router.get('/table-data', wait, async (req, res) => {
    const errors: Array<string> = [];
    const data = await getTableData().catch((e) => errors.push(e.message));
    res.send(getResponse(errors, data));
});

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
