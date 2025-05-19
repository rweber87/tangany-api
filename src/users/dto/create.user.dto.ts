export interface CreateUserDto {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}
