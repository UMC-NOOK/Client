import React, { FC } from 'react';
import clsx from 'clsx';
import arrowUpIcon from '../../../assets/button/home/Polygon_nickname_up.png';
import arrowDownIcon from '../../../assets/button/home/Polygon_nickname_down.png';

const prefixOptions = [
  '갓생러','고독한','빛 좋은','빌려온','야행성','유명한',
  '이 구역','종이책','책 먹는','책방의','프로',
];
const suffixOptions = [
  '고양이','누키','다독왕','독자','백수','살구',
  '애호가','작가님','직장인','책벌레','학생',
];

interface NicknameTabProps {
  selectedPrefix: string;
  setSelectedPrefix: React.Dispatch<React.SetStateAction<string>>;
  selectedSuffix: string;
  setSelectedSuffix: React.Dispatch<React.SetStateAction<string>>;
}

const VISIBLE_COUNT = 5;

const NicknameTab: FC<NicknameTabProps> = ({
  selectedPrefix,
  setSelectedPrefix,
  selectedSuffix,
  setSelectedSuffix,
}) => {
  const nPref = prefixOptions.length;
  const nSuff = suffixOptions.length;
  const prefIdx = prefixOptions.indexOf(selectedPrefix);
  const suffIdx = suffixOptions.indexOf(selectedSuffix);

  // 가운데 인덱스 오프셋
  const offset = Math.floor(VISIBLE_COUNT / 2);

  // 배열 인덱스를 원형으로 계산
  const circIndex = (idx: number, delta: number, size: number) => {
    return (idx + delta + size) % size;
  };

  // visible 5개 생성
  const visiblePrefixes = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
    prefixOptions[circIndex(prefIdx, i - offset, nPref)]
  );
  const visibleSuffixes = Array.from({ length: VISIBLE_COUNT }, (_, i) =>
    suffixOptions[circIndex(suffIdx, i - offset, nSuff)]
  );

  // 순환 이동 핸들러
  const movePrefix = (dir: 'up' | 'down') => {
    const newIdx =
      dir === 'up'
        ? circIndex(prefIdx, -1, nPref)
        : circIndex(prefIdx, +1, nPref);
    setSelectedPrefix(prefixOptions[newIdx]);
  };
  const moveSuffix = (dir: 'up' | 'down') => {
    const newIdx =
      dir === 'up'
        ? circIndex(suffIdx, -1, nSuff)
        : circIndex(suffIdx, +1, nSuff);
    setSelectedSuffix(suffixOptions[newIdx]);
  };

  return (
    <div className="w-full h-full rounded-[12px] flex flex-col items-center px-[32px] pt-[140.41px] text-white">
      {/* 별명 결과 */}
      <div
        className="text-[22px] font-[400px] text-center mb-[12px]"
      >
        별명 :&nbsp; {selectedPrefix} {selectedSuffix}
      </div>
      {/* 구분선 */}
      <div className="w-[250px]  flex-shrink-0 border-b border-[#555351] mb-[56px]" />

      {/* 룰렛 영역 */}
      <div className="flex gap-[16px]">
        {/* Prefix 룰렛 */}
        <div className="relative flex flex-col items-center w-[120px]">
          <button
            className="absolute left-[-32px] top-0"
            onClick={() => movePrefix('up')}
          >
            <img src={arrowUpIcon} alt="up" className="w-[17px] h-[17px] mt-[87px]" />
          </button>
          <div className="h-[207px] w-[120px] rounded-[8px] bg-[#423C35]/50 overflow-hidden">
            {visiblePrefixes.map((pfx, i) => (
              <div
                key={i}
                onClick={() => setSelectedPrefix(pfx)}
                className={clsx(
                  'py-[8px] flex justify-center items-center rounded-[8px] cursor-pointer text-[18px]',
                  i === offset
                    ? 'bg-[#423C35] text-white'
                    : 'text-white/50'
                )}
              >
                {pfx}
              </div>
            ))}
          </div>
          <button
            className="absolute left-[-32px] bottom-0"
            onClick={() => movePrefix('down')}
          >
            <img src={arrowDownIcon} alt="down" className="w-[17px] h-[17px] mb-[80px]" />
          </button>
        </div>

        {/* Suffix 룰렛 */}
        <div className="relative flex flex-col items-center w-[120px]">
          <button
            className="absolute right-[-32px] top-0"
            onClick={() => moveSuffix('up')}
          >
            <img src={arrowUpIcon} alt="up" className="w-[17px] h-[17px] mt-[87px]" />
          </button>

          <div className="relative h-[207px] w-[120px] rounded-[8px] bg-[#423C35]/50 overflow-hidden">
            {visibleSuffixes.map((sfx, i) => (
              <div
                key={i}
                onClick={() => setSelectedSuffix(sfx)}
                className={clsx(
                  'py-[8px] flex justify-center items-center rounded-[8px] cursor-pointer text-[18px]',
                  i === offset ? 'bg-[#423C35] text-white' : 'text-white/50'
                )}
              >
                {sfx}
              </div>
            ))}

            {/* ⬆︎ 상단: #373029 → #37302900 그라데이션 */}
            <div
              className="
                pointer-events-none absolute inset-x-0 top-0 h-[33px] z-10
                bg-gradient-to-b
                from-[#37302933] via-[#3730291A] to-[#37302900]
                rounded-t-[8px]
              "
            />

            {/* ⬇︎ 하단: #373029 → #37302900 그라데이션 */}
            <div
              className="
                pointer-events-none absolute inset-x-0 bottom-0 h-[33px] z-10
                bg-gradient-to-t
                from-[#37302933] via-[#3730291A] to-[#37302900]
                rounded-b-[8px]
              "
            />
          </div>


          <button
            className="absolute right-[-32px] bottom-0"
            onClick={() => moveSuffix('down')}
          >
            <img src={arrowDownIcon} alt="down" className="w-[17px] h-[17px] mb-[80px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameTab;