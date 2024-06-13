export interface UserType {
  name: string;
  addr: string;
  age: number;

  // [key: string]: UserType[keyof UserType];
}

export class User {
  name: string;
  addr: string;
  age: number;

  constructor(model: UserType) {
    this.name = model.name;
    this.addr = model.addr;
    this.age = model.age;
  }

  isAdult() {
    return this.age > 17;
  }

  [key: string]: User[keyof User];
}
