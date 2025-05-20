import { Request, Response, NextFunction } from 'express';
import { sendError } from '../../utils/response.handlers';
import UsersService from '../services/users.service';

export class UsersMiddleware {
  private service: UsersService;

  constructor(usersService: UsersService) {
    this.service = usersService;
  }

  userExists = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await this.service.getUserByEmail(email);
    if (!user) {
      next();
    } else {
      sendError(res, null, 'User with email already exists', 400);
    }
  };

  validateCreateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;
    const isEmailValid = this.validateEmail(email);
    if (isEmailValid) {
      next();
    } else {
      sendError(res, null, 'Invalid email', 400);
    }
  };

  validateEmail = (email: string) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
}
