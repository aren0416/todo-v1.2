import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logoutUser } from "../../apollo";

// 2
const ME_QUERY = gql`
  query me {
    me {
      id
      nickName
      username
      avatar
    }
  }
`;

export const useUser = () => {
  // 1
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  //3 로그인이 안됐으면 로그아웃시킴 (요청을 거부함)
  const { data } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });

  //4 (프론트의 헤더를 백엔드에 넘기지 못했기 때문에 null값이 뜨기에 해결해주기) -> 6번 안으로 옮김
  //   if (data?.me === null) {
  //     logoutUser();
  //   }

  //5 apollo에서 세팅

  //6 로그인했을때 me라는 query(=data)를 요청함, data값은 로그인시 매번 바뀜
  useEffect(() => {
    //data값이 매번 바뀔때 실행되는 영역
    //token이 없을때나 token값을 마음대로 바꿀 경우 실행안되도록 조건 걸어줌
    if (data?.me === null) {
      logoutUser();
    }
  }, [data]);

  //7 모든것이 충족되었을때 data값을 객체로 보내버림 (다시 사용할수도 있기 때문)
  return { data };
};
