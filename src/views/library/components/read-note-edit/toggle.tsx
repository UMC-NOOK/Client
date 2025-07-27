interface ToggleProps {
  isPhrase: boolean;
  setIsPhrase: (value: boolean) => void;
}

const Toggle = ({ isPhrase, setIsPhrase }: ToggleProps) => {
  const toggleHandler = () => {
    // isOn의 상태를 변경하는 메소드를 구현
    setIsPhrase(!isPhrase);
  };

  return (
    <>
      <div
        className="relative cursor-pointer"
        // 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행
        onClick={toggleHandler}
      >
        {/* 아래에 div 엘리먼트 2개가 있다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정 */}
        {/* Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가. 조건부 스타일링을 활용*/}
        <div
          className={`w-[60px] h-[24px] p-[1px] bg-[#33291f] rounded-[60px] ${isPhrase ? 'bg-[transition duration-500' : ''}`}
        />
        <div
          className={`absolute w-[38px] h-[22px] bg-nook-br-100 transition-[0.5s] rounded-[20px] left-[1px] top-[1px] text-white text-[10px] not-italic font-semibold leading-[normal] flex items-center justify-center ${isPhrase ? '' : 'transition-[0.5s] left-[21px]'}`}
        >
          {isPhrase ? '문장' : '감상'}
        </div>
      </div>
    </>
  );
};

export default Toggle;
