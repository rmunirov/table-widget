import { Client } from 'pg';

export const getDB = async () => {
    try {
        const client = new Client();
        await client.connect();
        return client;
    } catch (error) {
        console.error(error);
    }
};

