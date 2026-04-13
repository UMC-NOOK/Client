import { useMemo, useState } from "react";
import Picker from "react-mobile-picker";
import Icon from "../../../assets/icons/check.svg"
import "./PickerCss.css";

type YearMonthValue = {
  year: string;
  month: string;
};

type Props = {
  initialYear?: number;
  initialMonth: number;
  startYear: number;
  endYear: number;
  onApply: (value: { year: number; month: number; yearMonth: string }) => void;
};

export default function DropDown({
  initialYear = 2026,
  initialMonth,
  startYear,
  endYear,
  onApply,
}: Props) {
  const years = useMemo(
    () => Array.from({ length: endYear - startYear + 1 }, (_, i) => String(startYear + i)),
    [startYear, endYear],
  );

  const months = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1)),
    [],
  );

  const [pickerValue, setPickerValue] = useState<YearMonthValue>({
    year: String(initialYear),
    month: String(initialMonth),
  });

  const handleApply = () => {
    const year = Number(pickerValue.year);
    const month = Number(pickerValue.month);

    onApply?.({
      year,
      month,
      yearMonth: `${year}-${String(month).padStart(2, "0")}`,
    });
  };

  return (
    <div className="flex flex-col w-48.5 rounded-[4px] bg-gray-10">
        <div className="flex flex-row">
                <Picker
                    value={pickerValue}
                    onChange={(nextValue) => setPickerValue(nextValue as YearMonthValue)}
                    wheelMode="natural"
                    height={160}
                    itemHeight={30}
                    className="picker-root flex w-24 bg-gray-20 rounded-l-[4px]"
                >
                    <Picker.Column
                        name="year"
                        className="picker-column flex-1 border-r border-white/5"
                    >
                        {years.map((year) => (
                        <Picker.Item key={year} value={year}>
                            {({ selected }) => (
                            <div
                                className={`picker-item-content flex flex-row w-full gap-2  py-2 px-3 justify-stretch text-btn-14-r transition-colors ${
                                    selected ? "text-gray-90" : "text-gray-50"
                                }`}
                            >
                                <span className="flex items-center justify-center w-3 h-3">
                                    {selected ? <img src={Icon} className="flex items-center justify-center"/> : ""}
                                </span>
                                <span>
                                    {year}
                                </span>
                            </div>
                            )}
                        </Picker.Item>
                        ))}
                    </Picker.Column>
                </Picker>
                <Picker
                    value={pickerValue}
                    onChange={(nextValue) => setPickerValue(nextValue as YearMonthValue)}
                    wheelMode="natural"
                    height={160}
                    itemHeight={30}
                    className="picker-root flex w-24 bg-gray-20 rounded-r-[4px]"
                >
                    <Picker.Column name="month" className="picker-column flex-1">
                        {months.map((month) => (
                        <Picker.Item key={month} value={month}>
                            {({ selected }) => (
                            <div
                                className={`picker-item-content flex flex-row w-full gap-2 py-2 px-3 justify-stretch text-btn-14-r transition-colors ${
                                    selected ? "text-gray-90" : "text-gray-50"
                                }`}
                            >
                               <span className="flex items-center justify-center w-3 h-3">
                                    {selected ? <img src={Icon} className="flex items-center justify-center"/> : ""}
                                </span>
                                <span>
                                    {month}월
                                </span>
                            </div>
                            )}
                        </Picker.Item>
                        ))}
                    </Picker.Column>

                </Picker>
        </div>
        <div className="flex px-1 pb-1">
            <button
                type="button"
                onClick={handleApply}
                className="flex w-full rounded-[4px] bg-gray-25 text-label-14-sb text-gray-70 px-8 py-3 items-center justify-center"
            >
                적용
            </button>
        </div>
    </div>
  );
}