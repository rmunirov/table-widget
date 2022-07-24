import express from 'express';
import { config } from 'dotenv';
import { connect, getData } from './controllers';

config();

connect();

const app = express();

const port = process.env.PORT;

const wait = (req: any, res: any, next: () => void) => {
    setTimeout(next, 3000);
};

app.get('/', wait, async (req, res) => {
    getData().then((data) => res.send(data.rows));
});

app.listen(port, () => {
    console.log(`Server listening http://localhost:${port}`);
});
