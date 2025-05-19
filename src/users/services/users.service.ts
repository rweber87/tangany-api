import prisma from '../../prisma/client';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create.user.dto';

export default class UsersService {
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async getUserById(userId: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async createUser(data: CreateUserDto): Promise<CreateUserDto> {
    return await prisma.user.create({
      data,
    });
  }

  async deleteUser(userId: number): Promise<User> {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }
}
