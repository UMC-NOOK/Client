// export const signInSchema = {
//   minLength: {
//     value: 1,
//     message: '1글자 이상 입력해주세요.',
//   },
// };

export const signInSchema = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: { value: /\S+@\S+\.\S+/, message: '이메일 형식이 아닙니다.' },
  },
  password: {
    required: '비밀번호를 입력해주세요',
    minLength: { value: 7, message: '8자 이상 입력' },
  },
};
