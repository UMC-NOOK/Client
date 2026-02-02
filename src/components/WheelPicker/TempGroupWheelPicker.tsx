import { useMemo, useState } from 'react'
import GroupWheelPicker from './GroupWheelPicker'
import type { WheelItem } from './SingleWheelPicker'

function makeYearItems(): WheelItem[] {
  return [
    { id: '2025', value: '2025' },
    { id: '2026', value: '2026' },
  ]
}

function makeMonthItems(): WheelItem[] {
  return Array.from({ length: 12 }, (_, i) => {
    const m = i + 1
    return { id: String(m), value: `${m}월` }
  })
}

export default function TempGroupWheelPicker() {
  const leftData = useMemo(() => makeYearItems(), [])
  const rightData = useMemo(() => makeMonthItems(), [])

  const [isOpen, setIsOpen] = useState(false)

  // ✅ 마지막으로 휠에서 선택된 값이 “저장되는 값”
  const [yearId, setYearId] = useState('2025')
  const [monthId, setMonthId] = useState('1')

  const selectedText = `${yearId}년 ${monthId}월`

  return (
    <div className="page text-white">
      <h1 className="title">GroupWheelPicker 테스트</h1>

      <div className="info">
        <div className="label">현재 저장된 값</div>
        <div className="value">{selectedText}</div>
      </div>

      <button className="btn" onClick={() => setIsOpen(true)}>
        모달 열기
      </button>

      {/* ✅ 모달 표시 */}
      {isOpen && (
        <div
          className="backdrop"
          onClick={() => setIsOpen(false)} // 바깥 클릭하면 닫힘
        >
          {/* ✅ 모달 내용 클릭은 닫히지 않게 stopPropagation */}
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <GroupWheelPicker
              isOpen={isOpen}
              leftData={leftData}
              rightData={rightData}
              leftSelectedID={yearId}
              rightSelectedId={monthId}
              onChangeLeft={(item) => setYearId(item.id)}
              onChangeRight={(item) => setMonthId(item.id)}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
