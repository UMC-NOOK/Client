import ErrorImg from '../../../assets/button/auth/Vector.svg';

const ErrorBox = () => {
  return (
    <div className="w-[45.8rem] h-23 bg-[rgba(241,73,75,0.2)] flex items-center justify-center rounded-[6px] absolute top-10">
      <div className="flex justify-center items-center gap-5">
        <img
          src={ErrorImg}
          alt="에러이모지"
          className="object-contain w-[1.8rem] h-[1.8rem]"
        />
        <span className="text-sm font-normal text-[rgba(241,73,75,1)]">
          이메일 또는 비밀번호를 정확히 입력해주세요.
        </span>
      </div>
    </div>
  );
};

export default ErrorBox;
