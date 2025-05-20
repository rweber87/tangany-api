import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import { ReqResUser } from './reqres-users/reqres-users.routes.config';
import { sendSuccess } from './utils/response.handlers';

dotenv.config();
const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

const routes: Array<CommonRoutesConfig> = [];
const userRoutes = new UsersRoutes(app);
const reqResUserRoutes = new ReqResUser(app);

routes.push(userRoutes);
routes.push(reqResUserRoutes);

app.get('/', async (req: Request, res: Response) => {
  sendSuccess(res, null, `Server is currently running on port ${PORT}`, 200);
});

export { app, PORT, routes };
