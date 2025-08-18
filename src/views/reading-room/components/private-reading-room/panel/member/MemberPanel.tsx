import memberUnion from '../../../../../../assets/readingRoom/controll-icon/memberUnion.svg';
import userImg from '../../../../../../assets/button/book-info/usrImg.svg';
import MemberText from './MemberText';
import useGetMemberList from '../../../../hooks/private-reading-room/useQuery/useGetMemberList';

interface Member {
  userId: number;
  nickname: string;
  role: string;
  isMe: boolean;
}

function MemberPanel() {
  const roomId = 12;
  const { data, isLoading, isError, error, isSuccess, refetch } =
    useGetMemberList({
      roomId: Number(roomId),
    });

  console.log('맴바??', data);

  const hostMember: Member | undefined = data?.find(
    (member: Member) => member.isMe === true,
  );
  const guestMembers: Member[] =
    data?.filter((member: Member) => member.isMe === false) || [];

  // console.log('맴바', guestMembers);

  // 역할 번역 함수
  const translateRole = (role: string) => {
    return role === 'HOST' ? '호스트' : '게스트';
  };

  // const mockData = [
  //   { nickname: '경민', role: 'guest', userId: 1 },
  //   { nickname: '경민', role: 'guest', userId: 2 },
  //   // { nickname: '경민', role: 'guest', userId: 3 },
  // ];
  return (
    <div className="relative">
      <img src={memberUnion} alt="말풍선 배경" className="object-contain" />
      <div className="absolute top-0 left-0 right-0 w-full h-[94%] backdrop-blur-xl rounded-[12px]" />
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <div className="w-138 h-112 relative bottom-3 flex flex-col justify-start items-start">
          {hostMember && (
            <MemberText
              name={hostMember.nickname + ' (나)'}
              roll={translateRole(hostMember.role)}
              isMe={true}
            />
          )}
          <p className="w-138 border-b-1 my-14 border-[rgba(255,255,255,0.5)]" />
          {guestMembers.map((member, index) => (
            <MemberText
              key={member.userId || index}
              name={member.nickname}
              roll={translateRole(member.role)}
              isMe={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemberPanel;
