import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";
import Form, { FormEntity } from "./form";

type PType = {
  form: Form;
  change: (obj: Partial<FormEntity>) => void;
  addAge: (num: number) => void;
};

const store: StateCreator<PType> = (set) => {
  return {
    form: new Form({
      name: "",
      addr: "",
      age: 0,
    }),
    change: (obj) =>
      set((state) => {
        Object.entries(obj).forEach(([key, value]) => {
          if (state.form.hasOwnProperty(key)) {
            state.form[key] = value;
          }
        });
        return { ...state };
      }),
    addAge: (num) =>
      set((state) => {
        state.form.age = num;
        return { ...state };
      }),
  };
};
export const useForm = create<PType>()(devtools(store));

// export const useForm2 = create<PType>()(
//   devtools((set) => {
//     return {
//       form: new Form({
//         name: "",
//         addr: "",
//         age: 0,
//       }),
//       change: (obj) =>
//         set((state) => {
//           Object.entries(obj).forEach(([key, value]) => {
//             if (state.form.hasOwnProperty(key)) {
//               state.form[key] = value;
//             }
//           });
//           return { ...state };
//         }),
//       addAge: (num) =>
//         set((state) => {
//           state.form.age = num;
//           return { ...state };
//         }),
//     };
//   })
// );

// export const useForm = create<PType>()(
//   devtools((set) => {
//     console.log("first");
//     const state = { name: "", addr: "", age: 0 };
//     const form = new Form(state);

//     return {
//       form,
//       change: (obj) =>
//         set((state) => {
//           const [key, value] = Object.entries(obj)[0];

//           if (state.form.hasOwnProperty(key)) {
//             state.form[key] = value;
//           }

//           return { ...state };
//         }),
//       addAge: (num) =>
//         set((state) => {
//           state.form.age = num;
//           return { ...state };
//         }),
//     };
//   })
// );
