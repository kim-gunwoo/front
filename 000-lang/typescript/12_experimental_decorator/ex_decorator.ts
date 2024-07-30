console.log("--------------------------");

function convertAddString() {
  return function (target: any, propertyKey: string) {
    if (!target.constructor._convertFieldsAddString) {
      target.constructor._convertFieldsAddString = [];
    }
    target.constructor._convertFieldsAddString.push(propertyKey);
  };
}

function convertFieldsToAddString(obj: any): any {
  if (obj.constructor._convertFieldsAddString) {
    const newObj = { ...obj };
    obj.constructor._convertFieldsAddString.forEach((field: string) => {
      if (newObj[field]) {
        newObj[field] = newObj[field] + " hellow ~!";
      }
    });
    return newObj;
  }
  return obj;
}

function convertISOString() {
  return function (target: any, propertyKey: string) {
    if (!target.constructor._convertFields) {
      target.constructor._convertFields = [];
    }
    target.constructor._convertFields.push(propertyKey);
  };
}

function convertFieldsToISOString(obj: any): any {
  if (obj.constructor._convertFields) {
    const newObj = { ...obj };
    obj.constructor._convertFields.forEach((field: string) => {
      if (newObj[field] instanceof Date) {
        const [_date] = newObj[field].toISOString().split("T");
        newObj[field] = _date;
      }
    });
    return newObj;
  }
  return obj;
}

class Test {
  @convertAddString()
  name: string;

  @convertISOString()
  date: Date;

  constructor(name: string, date: Date) {
    this.name = name;
    this.date = date;
  }
}

const t = new Test("test", new Date());

console.log(t, Test);

const c = convertFieldsToISOString(t);
const c2 = convertFieldsToAddString(t);

console.log(c, c2);
