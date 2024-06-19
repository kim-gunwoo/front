import { User, UserType } from "@/model/user";
import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// interface UserType {
//   name: string;
//   addr: string;
//   age: number;

// [key: string]: UserType[keyof UserType];
// }

// class User {
//   name: string;
//   addr: string;
//   age: number;

//   constructor(model: UserType) {
//     this.name = model.name;
//     this.addr = model.addr;
//     this.age = model.age;
//   }

//   isAdult() {
//     return this.age > 17;
//   }

//   [key: string]: User[keyof User];
// }

interface StoreType {
  user: User;
  // user: UserType;
  change: (obj: Partial<UserType>) => void;
  addAge: (num: number) => void;
}

const store: StateCreator<StoreType> = (set) => {
  const state = {
    name: "",
    addr: "",
    age: 0,
  };
  const user = new User(state);

  return {
    // user: state,
    user,
    // user: new User(state),
    change: (obj) =>
      set((state) => {
        Object.entries(obj).forEach(([key, value]) => {
          if (state.user.hasOwnProperty(key)) {
            state.user[key] = value;
          }
        });
        return { ...state };
      }),
    // change: (obj) =>
    //   set((state) => {
    //     Object.entries(obj).forEach(([key, value]) => {
    //       if (state.user.hasOwnProperty(key)) {
    //         state.user[key] = value;
    //       }
    //     });
    //     // return state;
    //     return { ...state };
    //     // return { user: { ...state.user, ...obj } };
    //   }),
    addAge: (num: number) =>
      set((state) => {
        state.user.age = num;
        return { ...state };
      }),
  };
};

export const useUser = create<StoreType>()(
  //   devtools(persist(immer(store), { name: "user" }))
  // devtools(
  //   persist(store, {
  //     name: "user-storage",
  //     storage: createJSONStorage(() => sessionStorage),
  //   })
  // )
  // devtools(immer(store))
  devtools(store)
);
