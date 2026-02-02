import type { WheelItem } from "./SingleWheelPicker"
import SingleWheelPicker from "./SingleWheelPicker"

type Props ={
    isOpen : boolean
    
    leftData: WheelItem[]
    rightData: WheelItem[]

    leftSelectedID: string
    rightSelectedId: string

    onChangeLeft: (item: WheelItem) => void
    onChangeRight: (item: WheelItem) => void

    onClose: () => void
}

export default function GroupWheelPicker({
    isOpen,
    leftData,
    rightData,
    leftSelectedID,
    rightSelectedId,
    onChangeLeft,
    onChangeRight,
    onClose
}: Props) {
    if(!isOpen) {
        return null
    }

    return(
        <div>
            <div className="inline-flex items-stretch bg-[#13172A] gap-0.5 rounded-sm overflow-hidden">
                <div className="leftSinglePicker items-stretch">
                    <SingleWheelPicker
                        data={leftData}
                        selectedID={leftSelectedID}
                        onChange={onChangeLeft}
                        height={60}
                    />
                </div>

                <div className="rightSinglePicker items-stretch">
                    <SingleWheelPicker
                        data={rightData}
                        selectedID={rightSelectedId}
                        onChange={onChangeRight}
                        height={160}
                    />
                </div>
            </div>
        </div>
    )
}