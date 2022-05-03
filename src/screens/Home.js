import { gql, useQuery } from "@apollo/client";
import { logoutUser } from "../apollo";
import { useUser } from "../components/hooks/useUser";

//9
const SEE_TODOS_QUERY = gql`
  query seeTodos {
    seeTodos {
      id
      user {
        id
        username
        avatar
      }
      todo
      createdAt
    }
  }
`;

export const Home = () => {
  // apollo세팅 후 확인
  // const userData = useUser();

  //8
  const { data: userData } = useUser();
  // console.log(data);

  // 10
  const { data } = useQuery(SEE_TODOS_QUERY);
  console.log(data);

  return (
    <div>
      {/* 11 */}
      {data?.seeTodos?.map((todo) => todo.todo)}
      <button onClick={logoutUser}>logout</button>
    </div>
  );
};
