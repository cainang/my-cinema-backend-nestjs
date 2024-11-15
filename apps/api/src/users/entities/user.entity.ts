export default class User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: 'ADM' | 'OPR' | 'PRP';

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
    type: string,
  ) {
    if (!(type == 'ADM' || type == 'OPR' || type == 'PRP'))
      throw new Error('Invalid type to user');
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
