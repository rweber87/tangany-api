import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../../utils/response.handlers';
import UsersService from '../services/users.service';

export default class UsersController {
  private usersService: UsersService;

  constructor(usersService: UsersService) {
    this.usersService = usersService;
  }

  listUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.usersService.getAllUsers();
      sendSuccess(res, users, 'List of users');
    } catch (error) {
      console.error(`Users Controller ${error}`);
      sendError(res, error, 'Failed to retrieve all users');
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        sendError(res, null, 'User not found', 404);
        return;
      }
      sendSuccess(res, user, 'User data');
    } catch (err) {
      sendError(res, null, 'Failed to fetch user', 500);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      const newUser = await this.usersService.createUser(req.body);
      sendSuccess(res, newUser, 'New user data');
    } catch (err) {
      sendError(res, null, 'Failed to create new user', 500);
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const user = await this.usersService.deleteUser(userId);
      sendSuccess(res, user, 'User successfully deleted!');
    } catch (err) {
      sendError(res, null, 'Failed to delete user', 500);
    }
  };
}
