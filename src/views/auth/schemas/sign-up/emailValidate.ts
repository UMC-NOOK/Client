export const emailSchema = {
  required: '이메일은 필수 입력입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '이메일 형식이 올바르지 않습니다.',
  },
};

export const passwordSchema = {
  required: '비밀번호는 필수 입력입니다.',
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: '비밀번호 형식이 올바르지 않습니다.',
  },
};
