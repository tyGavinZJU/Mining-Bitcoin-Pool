import * as express from 'express';
import * as bodyParser from 'body-parser';
import { SuperResult } from './src/data';
import { getNodeList } from './src/nodeList';

const app = express();
const port = 8888;

app.use(bodyParser.json());

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', (_, res) => {
    let result: SuperResult = { status: 200, data: "node-list server is online" }
    res.send(result);
});

app.post('/nodeList', (req, res) => {
    if (req.body) {
        const nodeListRes = getNodeList(req.body);
        res.send(nodeListRes);
    } else {
        const result: SuperResult = { status: 500, message: 'param error' };
        res.send(result);
    }
});

app.listen(port, () => {
    console.log(`Node-List app listening at http://localhost:${port}`);
});