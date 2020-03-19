import * as express from 'express';
import User from '../controllers/user/user';

const user = new User();

const publicRoutes = express();

publicRoutes.post('/register', user.createUser);
publicRoutes.post('/login', user.login);

export default publicRoutes;