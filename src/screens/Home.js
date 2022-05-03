import { logoutUser } from "../apollo";

export const Home = () => {
  return (
    <div>
      Home
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};
