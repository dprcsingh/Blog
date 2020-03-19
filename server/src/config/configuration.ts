import * as dotenv from 'dotenv';
import IConfig from './IConfig';
dotenv.config();
const envs: IConfig = {
    PORT: Number(process.env.PORT),
    MONGO_URL: String(process.env.MONGO_URL),
    SALT: Number(process.env.SALT),
    SECRET: String(process.env.SECRET)
};
Object.freeze(envs);
export default envs;
