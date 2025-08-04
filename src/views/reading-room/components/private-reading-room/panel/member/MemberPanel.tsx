import memberUnion from '../../../../../../assets/readingRoom/controll-icon/memberUnion.svg';
import userImg from '../../../../../../assets/button/book-info/usrImg.svg';
import MemberText from './MemberText';

function MemberPanel() {
  const mockData = [
    { name: '경민', roll: 'guest' },
    { name: '경민', roll: 'guest' },
    { name: '경민', roll: 'guest' },
  ];
  return (
    <div className="relative">
      <img src={memberUnion} alt="말풍선 배경" className="object-contain" />
      <div className="absolute top-0 left-0 right-0 w-full h-[94%] backdrop-blur-xl rounded-[12px]" />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div className="w-138 h-102 relative bottom-3 flex flex-col justify-between items-start">
          <MemberText name={'경민'} roll={'host'} />
          <p className="w-138 border-b-1 border-[rgba(255,255,255,0.5)]" />
          {mockData.map((data) => (
            <MemberText name={data.name} roll={data.roll} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberPanel;
