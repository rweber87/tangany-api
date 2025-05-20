import { Request, Response } from 'express';
import { ReqResUserService } from '../services/reqres-users.service';
import { sendSuccess, sendError } from '../../utils/response.handlers';

export class ReqResUserController {
  constructor(private service: ReqResUserService) {}

  listUsers = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const users = await this.service.getUsers(page);
      sendSuccess(res, users, 'List of users');
    } catch (error) {
      sendError(res, error, 'Failed to fetch ReqRes Users', 500);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const user = await this.service.createUser(req.body);
      sendSuccess(res, user, 'Created new reqres user', 201);
    } catch (error) {
      sendError(res, error, 'Failed to create new ReqRes User', 500);
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await this.service.getUserById(userId);
      sendSuccess(res, user, 'Created new reqres user', 201);
    } catch (error) {
      sendError(res, error, 'Failed to fetch ReqRes User', 500);
    }
  };
}
