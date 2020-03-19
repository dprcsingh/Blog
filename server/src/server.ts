import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import IConfig from './config/IConfig';
import DataBase from './database';
import router from './router';

const app = express();
const database = new DataBase();
export default class HttpServer {

    constructor(private config: IConfig) {
    }
    public bootstrap() {
        this.initBodyParser();
        this.initCookieParser();
        this.initCors();
        this.setUpRoutes();
    }
    public async run() {
        const { PORT, MONGO_URL } = this.config;
        const connection = await database.open(MONGO_URL);
        if (connection) {
            app.listen(PORT, () => {
                console.log(`Server is Running at PORT:${PORT}`);
            });
        }
    }

    private initBodyParser() {
        // Parse application form url encoded
        app.use(bodyParser.urlencoded({ extended: false }));
        // Parse application.json
        app.use(bodyParser.json());
    }
    private initCookieParser() {
        /**
         * Parse cookie header and populate req.cookies
         */
        app.use(cookieParser());
    }
    private initCors() {
        app.use(cors());
    }

    private setUpRoutes() {
        app.use('/api', router);
    }

}