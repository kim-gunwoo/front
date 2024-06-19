import { useForm } from "@/zustand/FormStore";
import { useUser } from "@/zustand/userStore";

export default function View() {
  // const { form, addAge, change } = useForm((state) => state);
  // const { user: form, addAge, change } = useUser((state) => state);
  const form = useUser((state) => state.user);
  const change = useUser((state) => state.change);
  const addAge = useUser((state) => state.addAge);

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    change({ [name]: value });
  };

  return (
    <div>
      <div>{form.name}</div>
      <div>{form.addr}</div>
      <div>{form.age}</div>
      <div>isAdult : {form.isAdult() ? "adult" : "child"}</div>
      <button onClick={() => addAge(form.age + 1)}>add +</button>
      <input name="name" onChange={onchange} />
    </div>
  );
}
