import axios from 'axios';
import NodeCache from 'node-cache';
import { CreateReqresUserDto } from '../dto/create-reqres-user.dto';

const cache = new NodeCache({ stdTTL: 60 });

export class ReqResUserService {
  api: string;

  constructor() {
    this.api = `${process.env.REQRES_API_BASE}/users`;
  }
  async getUsers(page = 1) {
    const cacheKey = `users_page_${page}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await axios.get(this.api, {
      params: { page },
    });

    cache.set(cacheKey, response.data);

    return response.data;
  }

  async createUser(user: CreateReqresUserDto) {
    const response = await axios.post(this.api, user, {
      headers: {
        'x-api-key': process.env.REQ_RES_API_KEY,
      },
    });
    return response.data;
  }

  async getUserById(userId: number) {
    const cacheKey = `user_${userId}`;
    const cached = cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    const response = await axios.get(`${this.api}/${userId}`);

    return response.data;
  }
}
