export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  type: 'ADM' | 'OPR' | 'PRP';
}
