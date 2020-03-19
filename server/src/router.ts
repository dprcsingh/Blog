import { Router } from 'express';
import * as express from 'express';
import publicRoutes from './router/publicRoutes';

const router = express.Router();

router.use('/public', publicRoutes);

export default router;