import { Application } from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import { UsersMiddleware } from './middleware/users.middleware';
import UsersService from './services/users.service';

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes(): Application {
    const usersService = new UsersService();
    const usersController = new UsersController(usersService);
    const usersMiddleware = new UsersMiddleware(usersService);

    this.app
      .route('/users')
      .get(usersController.listUsers)
      .post(
        usersMiddleware.userExists,
        usersMiddleware.validateCreateUser,
        usersController.createUser
      );

    this.app
      .route('/users/:userId')
      .get(usersController.getUserById)
      .delete(usersController.deleteUser);

    return this.app;
  }
}
