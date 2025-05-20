import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { ReqResUserService } from './services/reqres-users.service';
import { ReqResUserController } from './controllers/reqres-users.controller';
import { ReqResUsersMiddleware } from './middleware/reqres.middleware';

export class ReqResUser extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersReqResRoutes');
  }

  configureRoutes(): Application {
    const service = new ReqResUserService();
    const controller = new ReqResUserController(service);
    const middleware = new ReqResUsersMiddleware(service);

    this.app
      .route('/external-users')
      .get(controller.listUsers)
      .post(middleware.validateCreateReqResUser, controller.createUser);

    this.app.route('/external-users/:userId').get(controller.getUserById);

    return this.app;
  }
}
