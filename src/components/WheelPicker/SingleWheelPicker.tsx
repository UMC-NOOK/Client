import WheelPicker from 'react-simple-wheel-picker'
import './wheelPickerCss.css'

export type WheelItem = { id: string; value: string }

type Props = {
    data: WheelItem[]
    selectedID: string
    onChange: (item: WheelItem) => void
    height: number
    width?: number
    itemHeight?: number

    color?:string
    activeColor?:string
    backgroundColor?: string
}

export default function SingleWheelPicker({
    data,
    selectedID,
    onChange,
    height=160,
    width=96,
    itemHeight=30,
    color="#697198",
    activeColor="#ECECEC",
    backgroundColor='#212742'
}: Props) {
  return (
    <div className='inline-flex singleWheelRoot text-'>
      <WheelPicker
            data={data}
            selectedID={selectedID}
            onChange={(picked) => onChange({id: picked.id, value: String(picked.id)})}
            height={height}
            width={width}
            itemHeight={itemHeight}
            color={color}
			      activeColor={activeColor}
            backgroundColor={backgroundColor}
      />
    </div>
  
  )
}
