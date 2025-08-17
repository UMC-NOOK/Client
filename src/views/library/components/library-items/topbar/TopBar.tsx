import gridButton from '../../../../../assets/button/library/Frame 25.png';
import hamburger from '../../../../../assets/button/library/Frame 26.png';

import { useGetProfile } from '../../../../home/hooks/useQuery/useGetProfile';
import { useGetMe } from '../../../../home/hooks/useQuery/useGetMe';

interface TopBarProps {
  onChangeGrid: () => void;
  onChangeVertical: () => void;
  activeView: 'grid' | 'vertical';
}

const TopBar = ({
  onChangeGrid,
  onChangeVertical,
  activeView,
}: TopBarProps) => {
  // alias (별명)
  const { data: profile } = useGetProfile();
  // 본명 (nickname)
  const { data: me } = useGetMe();

  const alias = profile?.alias?.trim() || '별명 없음';
  const realName = me?.nickname?.trim() || '이름 없음';

  return (
    <div className="w-full h-34 bg-[rgba(66,60,53,0.2)] text-nook-100 flex justify-between items-center px-20 rounded-[8px]">
      <div className="flex items-baseline gap-1">
        {/* 별명 */}
        <span
          className="text-white"
          style={{
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '25px',
          }}
        >
          {alias}
        </span>

        {/* 닉네임 */}
        <span
          className="text-[#7ABFC9]"
          style={{
            fontFamily: 'Pretendard',
            fontSize: '18px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '25px',
          }}
        >
          {realName}
        </span>

        {/* 님의 서재 */}
        <span
          className="text-white"
          style={{
            fontFamily: 'Pretendard',
            fontSize: '17px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '25px',
          }}
        >
          님의 서재
        </span>
      </div>

      <div className="flex gap-2">
        <button
          className={`w-14 h-14 object-contain rounded-md  ${
            activeView === 'grid' ? 'bg-[rgba(66,60,53,1)]' : 'bg-transparent'
          }`}
          onClick={onChangeGrid}
        >
          <img src={gridButton} alt="그리드버튼" />
        </button>
        <button
          className={`w-14 h-14 object-contain rounded-md  ${
            activeView === 'vertical'
              ? 'bg-[rgba(66,60,53,1)]'
              : 'bg-transparent'
          }`}
          onClick={onChangeVertical}
        >
          <img src={hamburger} alt="햄버거버튼" />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
