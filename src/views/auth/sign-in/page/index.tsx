import Logo from '../../components/Logo';
import Input from '../../components/Input';
import LoginOptions from '../../components/LoginOptions';
import KakaoBtn from '../../components/KakaoBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[rgba(66,60,53,0.2)] border-1 border-[rgba(243,238,220,1)] w-[54.1rem] h-[65.2rem] flex flex-col items-center rounded-[15px]"
      >
        <div className="mt-40 mb-30">
          <Logo />
        </div>
        <div className="w-[40rem]">
          <div className="flex flex-col gap-19">
            <Input name={'email'} hideBtn={false} register={register} />
            <Input name={'password'} hideBtn={true} register={register} />
          </div>
          <LoginOptions />
          <div className="flex flex-col gap-6 mt-32">
            <SubmitBtn />
            <KakaoBtn />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
