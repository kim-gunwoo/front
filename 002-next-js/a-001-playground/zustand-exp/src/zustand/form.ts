export interface FormEntity {
  name: string;
  addr: string;
  age: number;
}

export default class Form {
  name: string;
  addr: string;
  age: number;

  constructor(entity: FormEntity) {
    this.name = entity.name;
    this.addr = entity.addr;
    this.age = entity.age;
  }

  isAdult() {
    return this.age > 18;
  }

  [key: string]: Form[keyof Form];
}
