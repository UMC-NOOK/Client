import Logo from '../../components/Logo';
import Input from '../../components/Input';
import LoginOptions from '../../components/LoginOptions';
import KakaoBtn from '../../components/KakaoBtn';
import SubmitBtn from '../../components/SubmitBtn';
import { useForm } from 'react-hook-form';
import { signInSchema } from '../../schemas/sign-in/validateSignIn';
import ErrorBox from '../../components/ErrorBox';
import useSignIn from '../../hook/useMutaion/useSignIn';
import loginBox from '../../../../assets/auth/Loginbox.png';
import forPCBtn from '../../../../assets/auth/plzPC.svg';
import { useEffect, useState } from 'react';
import MobileModal from '../../components/MobileModal';

type FormData = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signInMutate, isError: isMutationError } = useSignIn();

  const watchedValues = watch();

  const onSubmit = (data: FormData) => {
    // console.log(data);
    signInMutate({
      email: data.email,
      password: data.password,
    });
  };

  const hasErrors = Object.keys(errors).length > 0;
  const hasApiError = isMutationError;
  const shouldShowErrorBox = hasErrors || hasApiError;
  const isEmpty = !watchedValues.email || !watchedValues.password;
  const isButtonDisabled = hasErrors || !isValid || isEmpty;

  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const onMobileClick = () => {
    setShowModal(true);
  };

  const offMobileClick = () => {
    setShowModal(false);
  };
  // console.log(errors);

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-[54.1rem] h-[65.2rem] flex flex-col items-center rounded-[15px] relative"
        style={{
          backgroundImage: `url(${loginBox})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {showModal && <MobileModal onClose={offMobileClick} />}
        {shouldShowErrorBox && <ErrorBox />}

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
            <SubmitBtn
              hasErrors={isButtonDisabled}
              text="로그인"
              type={isMobile ? 'button' : 'submit'}
              onClick={isMobile ? onMobileClick : undefined}
            />
            <KakaoBtn />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
