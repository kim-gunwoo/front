/**
 * Namespace
 */
namespace Home {
  class Idol {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  export const yuJin = new Idol("안유진", 23);
}

namespace Post {
  class User {
    email: string;
    name: string;

    constructor(email: string, name: string) {
      this.email = email;
      this.name = name;
    }
  }

  const admin = new User("admin@codefactory.ai", Home.yuJin.name);

  console.log(admin);
}

namespace Comment {
  const name = "comment";

  namespace Detail {
    const page = "detail";

    console.log(name);
    console.log(page);
  }

  console.log("----------");
  console.log(name);
  // console.log(page);
}

const AlpStatus = {
  A: "A",
  B: "B",
} as const;

type StatusType = (typeof AlpStatus)[keyof typeof AlpStatus];

function func(status: StatusType) {
  switch (status) {
    case AlpStatus.A:
      return "a";
    case AlpStatus.B:
      return "b";
  }
}

func("A");

enum NameAlp {
  A = "A",
  B = "B",
}

namespace NameAlp {
  export function toString(status: NameAlp) {
    switch (status) {
      case NameAlp.A:
        return "a";
      case NameAlp.B:
        return "b";
    }
  }
}

NameAlp.toString(NameAlp.A);

enum Alp {
  A = "A",
  B = "B",
}

function func2(status: Alp) {
  switch (status) {
    case Alp.A:
      return "a";
    case Alp.B:
      return "b";
  }
}

func2(Alp.A);

console.log(Alp[Alp.A]);
