export const NICKNAME_MAX_LENGTH = 10;

const NICKNAME_ALLOWED_CHARACTERS = /^[\p{Script=Hangul}A-Za-z0-9 ]+$/u;

export function getNicknameValidationMessage(nickname: string) {
  if (nickname.length > NICKNAME_MAX_LENGTH) {
    return `닉네임은 공백 포함 최대 ${NICKNAME_MAX_LENGTH}자까지 입력할 수 있어요.`;
  }

  if (nickname.trim().length === 0) {
    return "닉네임은 공백만 입력할 수 없어요.";
  }

  if (/^\s/.test(nickname)) {
    return "닉네임 앞에는 공백을 사용할 수 없어요.";
  }

  if (/\s$/.test(nickname)) {
    return "닉네임 뒤에는 공백을 사용할 수 없어요.";
  }

  if (!NICKNAME_ALLOWED_CHARACTERS.test(nickname)) {
    return "닉네임은 영문, 숫자, 한글, 띄어쓰기만 사용할 수 있어요.";
  }

  return null;
}
