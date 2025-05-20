import { Request, Response, NextFunction } from 'express';
import { ReqResUserService } from '../services/reqres-users.service';
import { sendError } from '../../utils/response.handlers';

export class ReqResUsersMiddleware {
  private service: ReqResUserService;

  constructor(reqResUserService: ReqResUserService) {
    this.service = reqResUserService;
  }

  validateCreateReqResUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name, job } = req.body;
    if (!name || !job) {
      sendError(res, null, 'Invalid name or job', 400);
    } else {
      next();
    }
  };
}
