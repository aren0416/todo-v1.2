import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BottomCon } from "../components/auth/BottomCon";
import { Button } from "../components/auth/Button";
import { ErrorMessage } from "../components/auth/ErrorMessage";
import { FormTitle } from "../components/auth/FormTitle";
import { Form, FormWrap, Input, Wrap } from "../components/auth/styles";
import { routes } from "../routes";

const CREATE_ACCONT_MUTATION = gql`
  mutation createAccount(
    $nickName: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      nickName: $nickName
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    watch,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onCompleted = (data) => {
    const { username } = getValues();
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      return setError("results", {
        message: error,
      });
    } else {
      navigate(routes.home, {
        state: {
          message: `${username}님 회원가입이 되었어요! 로그인 해주세요`,
        },
      });
    }
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCONT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { username, nickName, password } = getValues();
    createAccount({
      variables: {
        username,
        nickName,
        password,
      },
    });
  };

  return (
    <Wrap>
      <FormWrap>
        <FormTitle title="회원가입" />
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
            {...register("nickName", {
              required: "닉네임은 필수에요",
              minLength: {
                value: 3,
                message: "닉네임은 3자리 이상 적어줘야 돼요!",
              },
            })}
            type="text"
            placeholder="닉네임"
          />
          {errors?.nickName?.message ? (
            <ErrorMessage message={errors?.nickName?.message} />
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

          <Input
            {...register("re_password", {
              required: "패스워드는 확인을 해주세요",
              minLength: {
                value: 8,
                message: "패스워드는 8자리 이상 적어줘야 돼요!",
              },
              validate: (value) =>
                value === password.current || "패스워드가 같지않아요!",
            })}
            type="password"
            placeholder="패스워드 확인"
          />
          {errors?.re_password?.message ? (
            <ErrorMessage message={errors?.re_password?.message} />
          ) : (
            ""
          )}

          <Button opacity={isValid ? "1" : "0.5"} text={"회원가입"} />
          {errors?.results?.message ? (
            <ErrorMessage message={errors?.results?.message} />
          ) : (
            ""
          )}
        </Form>

        <BottomCon
          text="아이디가 있으신가요?"
          link={routes.home}
          linkText="로그인"
        />
      </FormWrap>
    </Wrap>
  );
};
