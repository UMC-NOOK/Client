import openeye from '../../../assets/button/auth/eyeOpen.svg';
import closeeye from '../../../assets/button/auth/eyeClose.svg';
import { useState } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  hideBtn: boolean;
  register: UseFormRegister<T>;
  name: Path<T>;
  schema: Record<string, any>;
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
}: InputProps<T>) => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const formName = nameConverter(name);
  // console.log(schema);

  return (
    <div className="w-full h-[6.3rem] flex flex-col gap-4 border-b border-[rgba(255,255,255,0.5)]">
      <p className="text-[1.6rem] font-normal text-nook-100">{formName}</p>
      <div className="relative w-full">
        <input
          type={name === 'password' && isHide === true ? 'password' : 'text'}
          {...register(name, { ...schema })}
          className="w-full text-md text-nook-100 font-normal pr-10 bg-transparent outline-none autofill:shadow-[inset_0_0_0px_1000px_transparent] autofill:[-webkit-text-fill-color:inherit]"
        />

        {hideBtn && (
          <button
            type="button"
            onClick={() => setIsHide((prev) => !prev)}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          >
            <img
              src={isHide ? openeye : closeeye}
              alt="toggle visibility"
              className="w-[1.8rem] h-[1.8rem] object-contain"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
