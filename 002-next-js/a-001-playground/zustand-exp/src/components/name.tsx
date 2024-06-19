import useStore from "@/hooks/useStore";
import useZutand from "@/zustand/store";
import { useUser } from "@/zustand/userStore";

export default function Name() {
  const name = useZutand((state) => state.form.name);
  const user = useUser((state) => state.user);
  // const user = useStore(useUser, (state) => state.user);
  const change = useUser((state) => state.change);
  const addAge = useUser((state) => state.addAge);

  console.log(user);

  return (
    <div>
      <div>name : {name}</div>
      <div>user.name : {user?.name}</div>
      {/* <div>user.isAdult : {user.isAdult() ? "y" : "n"}</div> */}
      <div>
        <input
          type="text"
          onChange={(e) => {
            change({ name: e.target.value });
          }}
        />
      </div>
      <div>
        <button onClick={() => addAge(user.age + 1)}>add age</button>
      </div>
    </div>
  );
}
