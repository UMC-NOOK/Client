import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import SubmitBtn from '../../components/SubmitBtn';
import Logo from '../../components/Logo';
import { signUnSchema } from '../../schemas/sign-up/validateSignUp';
import useSignUp from '../../hook/useMutaion/useSignUp';
import { useNavigate } from 'react-router-dom';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ mode: 'onChange' });

  const { mutate: signUpMutate } = useSignUp();
  const naviagte = useNavigate();
  const signUpSchema = signUnSchema(getValues);

  const onSubmit = async (data: FormData) => {
    signUpMutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  const hasErrors = Object.keys(errors).length > 0;

  // console.log(errors.name);

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[rgba(66,60,53,0.2)] border-1 border-[rgba(243,238,220,1)] w-[54.1rem] h-[79rem] flex flex-col items-center rounded-[15px] relative mb-45"
      >
        <div className="mt-40 mb-30">
          <Logo />
        </div>
        <div className="w-[40rem]">
          <div className="flex flex-col gap-19">
            <Input
              name={'name'}
              hideBtn={false}
              placeholder="nook"
              register={register}
              schema={signUpSchema.name}
              error={errors.name}
            />
            <Input
              name={'email'}
              hideBtn={false}
              placeholder="readingnook@co.kr"
              register={register}
              schema={signUpSchema.email}
              error={errors.email}
            />
            <Input
              name={'password'}
              hideBtn={true}
              placeholder="7~20자 이내, 영문/숫자 조합"
              register={register}
              schema={signUpSchema.password}
              error={errors.password}
            />
            <Input
              name={'passwordCheck'}
              hideBtn={true}
              placeholder="비밀번호를 다시 입력하세요"
              register={register}
              schema={signUpSchema.passwordCheck}
              error={errors.passwordCheck}
            />
          </div>
          <div className="flex justify-center items-start relative top-30">
            <p className="text-[1.3rem] text-nook-100 font-normal">
              <span className="border-b-1 border-nook-100">이용약관</span>과{' '}
              <span className="border-b-1 border-nook-100">
                개인정보취급방침
              </span>
              을 확인했고, 동의합니다.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-42">
            <SubmitBtn hasErrors={hasErrors} text="동의하고 회원가입" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
