import openeye from '../../../assets/button/auth/eyeOpen.svg';
import closeeye from '../../../assets/button/auth/eyeClose.svg';
import { useState } from 'react';
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  hideBtn: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  schema?: RegisterOptions<T, Path<T>>;
  placeholder?: string;
  error?: FieldErrors<T>[Path<T>];
}

export function nameConverter(name: string) {
  const mapping: Record<string, string> = {
    email: '이메일',
    password: '비밀번호',
    passwordCheck: '비밀번호 확인',
    name: '이름',
  };

  return mapping[name] || name;
}

const Input = <T extends FieldValues>({
  hideBtn,
  register,
  name,
  schema,
  placeholder,
  error,
}: InputProps<T>) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const formName = nameConverter(name);
  // console.log(error);

  return (
    <div className="w-full h-[5.75rem] flex flex-col gap-4 border-b border-[rgba(255,255,255,0.5)]">
      <p className="text-[1.6rem] font-normal text-nook-100">{formName}</p>
      <div className="relative w-full">
        <input
          type={
            (name === 'password' || name === 'passwordCheck') && isHide
              ? 'password'
              : 'text'
          }
          placeholder={placeholder}
          {...register(name, { ...schema })}
          className="w-full text-md text-nook-100 font-normal pr-10 bg-transparent outline-none placeholder:text-md placeholder:font-normal placeholder:opacity-50 autofill:shadow-[inset_0_0_0px_1000px_transparent] autofill:[-webkit-text-fill-color:inherit]"
        />

        {hideBtn && (
          <button
            type="button"
            onClick={() => setIsHide((prev) => !prev)}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <img
              src={isHide ? closeeye : openeye}
              alt="toggle visibility"
              className="w-[1.8rem] h-[1.8rem] object-contain"
            />
          </button>
        )}

        {typeof error?.message === 'string' && (
          <p className="text-[rgba(241,73,75,1)] text-sm absolute top-13">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
