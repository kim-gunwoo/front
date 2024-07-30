type ConverterFunction = (value: any) => any;

function convertISOString() {
  return function (target: any, propertyKey: string) {
    if (!target.constructor._convertFields) {
      target.constructor._convertFields = {} as Record<
        string,
        ConverterFunction[]
      >;
    }
    if (!target.constructor._convertFields[propertyKey]) {
      target.constructor._convertFields[propertyKey] = [];
    }
    target.constructor._convertFields[propertyKey].push(
      (value: any) => value.toISOString().split("T")[0]
    );
  };
}

function convertToUppercase() {
  return function (target: any, propertyKey: string) {
    if (!target.constructor._convertFields) {
      target.constructor._convertFields = {} as Record<
        string,
        ConverterFunction[]
      >;
    }
    if (!target.constructor._convertFields[propertyKey]) {
      target.constructor._convertFields[propertyKey] = [];
    }
    target.constructor._convertFields[propertyKey].push(
      (value: any) => value.toUpperCase() + " & hello"
    );
  };
}

class User {
  @convertISOString()
  createDate: Date;

  @convertToUppercase()
  name: string;

  constructor(name: string, createDate: Date) {
    this.name = name;
    this.createDate = createDate;
  }
}

function convertFields(obj: any): any {
  const convertFields = obj.constructor._convertFields as Record<
    string,
    ConverterFunction[]
  >;
  if (convertFields) {
    const newObj = { ...obj };
    for (const [field, converters] of Object.entries(convertFields)) {
      if (newObj.hasOwnProperty(field)) {
        for (const converter of converters) {
          newObj[field] = converter(newObj[field]);
        }
      }
    }
    return newObj;
  }
  return obj;
}

// 예제 사용법
const user = new User("John Doe", new Date());
const userData = convertFields(user);

console.log(userData);
