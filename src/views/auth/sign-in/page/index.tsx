import Logo from '../../components/Logo';
import Input from '../../components/Input';
import LoginOptions from '../../components/LoginOptions';
import KakaoBtn from '../../components/KakaoBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../../schemas/sign-in/validateSignIn';
import ErrorBox from '../../components/ErrorBox';
import useSignIn from '../../hook/useMutaion/useSignIn';

type FormData = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onSubmit' });

  const { mutate: signInMutate } = useSignIn();

  const onSubmit = (data: FormData) => {
    console.log(data);
    signInMutate({
      email: data.email,
      password: data.password,
    });
  };

  const hasErrors = Object.keys(errors).length > 0;

  console.log(errors);

  return (
    <div className="flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[rgba(66,60,53,0.2)] border-1 border-[rgba(243,238,220,1)] w-[54.1rem] h-[65.2rem] flex flex-col items-center rounded-[15px] relative"
      >
        {hasErrors && <ErrorBox />}

        <div className="mt-40 mb-30">
          <Logo />
        </div>
        <div className="w-[40rem]">
          <div className="flex flex-col gap-19">
            <Input
              name={'email'}
              hideBtn={false}
              register={register}
              schema={signInSchema.email}
            />
            <Input
              name={'password'}
              hideBtn={true}
              register={register}
              schema={signInSchema.password}
            />
          </div>
          <LoginOptions />
          <div className="flex flex-col gap-6 mt-32">
            <SubmitBtn hasErrors={hasErrors} text="로그인" />
            <KakaoBtn />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
