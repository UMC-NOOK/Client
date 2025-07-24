import { RegisterOptions, UseFormGetValues } from 'react-hook-form';

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

type SignUpSchema = {
  [K in keyof SignUpFormValues]: RegisterOptions<SignUpFormValues, K>;
};

export const signUnSchema = (
  getValues: UseFormGetValues<SignUpFormValues>,
): SignUpSchema => ({
  name: {
    required: '2~30자 이내로 입력해주세요.',
    minLength: { value: 2, message: '2~30자 이내로 입력해주세요.' },
    maxLength: { value: 30, message: '2~30자 이내로 입력해주세요.' },
  },
  email: {
    required: '이메일을 올바르게 입력해주세요.',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: '이메일을 올바르게 입력해주세요.',
    },
  },
  password: {
    required: '7~20자의 영문/숫자 조합이어야 합니다.',
    minLength: {
      value: 7,
      message: '7자 이상 입력해주세요.',
    },
    maxLength: {
      value: 20,
      message: '20자 이하로 입력해주세요.',
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{7,20}$/,
      message: '영문과 숫자를 조합해서 입력해주세요.',
    },
  },
  passwordCheck: {
    required: '비밀번호를 다시 입력해주세요',
    validate: (value: string) =>
      value === getValues('password') || '비밀번호가 일치하지 않습니다',
  },
});
