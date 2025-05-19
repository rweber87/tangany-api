import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { ReqResUserService } from './services/reqres-users.service';
import { ReqResUserController } from './controllers/reqres-users.controller';

export class ReqResUser extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersReqResRoutes');
  }

  configureRoutes(): Application {
    const service = new ReqResUserService();
    const controller = new ReqResUserController(service);

    this.app
      .route('/external-users')
      .get(controller.listUsers)
      .post(controller.createUser);

    this.app.route('/external-users/:userId').get(controller.getUserById);

    return this.app;
  }
}
