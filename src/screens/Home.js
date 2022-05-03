import { logoutUser } from "../apollo";
import { useUser } from "../components/hooks/useUser";

export const Home = () => {
  // apollo세팅 후 확인
  // const userData = useUser();

  //8
  const { data } = useUser();
  console.log(data);

  return (
    <div>
      Home
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};
