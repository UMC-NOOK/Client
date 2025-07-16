import clsx from 'clsx';

interface SubmitBtnProps {
  hasErrors: boolean;
}
const SubmitBtn = ({ hasErrors }: SubmitBtnProps) => {
  return (
    <button
      className={clsx(
        'w-full h-[5.2rem] text-[1.6rem] font-normal rounded-[6px]',
        hasErrors
          ? 'bg-[rgba(66,60,53,0.5)] text-[rgba(255,255,255,0.5)] cursor-not-allowed'
          : 'bg-[rgba(66,60,53,1)] text-nook-100',
      )}
      disabled={hasErrors}
    >
      로그인
    </button>
  );
};

export default SubmitBtn;
