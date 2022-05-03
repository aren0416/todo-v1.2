import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../apollo";
import { BottomCon } from "../components/auth/BottomCon";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { FormTitle } from "../components/auth/FormTitle";
import { Form, FormWrap, Input, Wrap } from "../components/auth/styles";
import { routes } from "../routes";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;

    if (!ok) {
      return setError("results", {
        message: error,
      });
    }

    if (token) {
      loginUser(token);
    }

    navigate(routes.home, {
      replace: true,
    });
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();

    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <Wrap>
      <FormWrap>
        <FormTitle title="LOGIN" />
        {location?.state?.message ? (
          <ErrorMessage message={location?.state?.message} />
        ) : (
          ""
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              required: "아이디는 필수에요",
              minLength: {
                value: 3,
                message: "아이디는 3자리 이상 적어줘야 돼요!",
              },
            })}
            type="text"
            placeholder="아이디"
          />
          {errors?.username?.message ? (
            <ErrorMessage message={errors?.username?.message} />
          ) : (
            ""
          )}

          <Input
            {...register("password", {
              required: "패스워드는 필수에요",
              minLength: {
                value: 8,
                message: "패스워드는 8자리 이상 적어줘야 돼요!",
              },
            })}
            type="password"
            placeholder="패스워드"
          />
          {errors?.password?.message ? (
            <ErrorMessage message={errors?.password?.message} />
          ) : (
            ""
          )}

          <Button opacity={isValid ? "1" : "0.5"} text={"로그인"} />
          {errors?.results?.message ? (
            <ErrorMessage message={errors?.results?.message} />
          ) : (
            ""
          )}
        </Form>

        <BottomCon
          text="아이디가 없으신가요?"
          link={routes.signup}
          linkText="회원가입"
        />
      </FormWrap>
    </Wrap>
  );
};
