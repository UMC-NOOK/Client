import * as CheckboxLib from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";

type CheckboxProps = {
  text: string;
  /** 부모가 체크 상태를 직접 관리해야 할 때(예: 폼 제출값)만 전달. 없으면 기존처럼 내부 state로 동작 */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export default function Checkbox({
  text,
  checked,
  onCheckedChange,
}: CheckboxProps) {
  // checked prop이 없으면 내부 state로 비제어 동작을 유지한다.
  const [uncontrolledChecked, setUncontrolledChecked] = React.useState(false);
  const isControlled = checked !== undefined;
  const resolvedChecked = isControlled ? checked : uncontrolledChecked;

  const handleCheckedChange = (value: boolean) => {
    if (!isControlled) setUncontrolledChecked(value);
    onCheckedChange?.(value);
  };

  return (
    <div className="flex h-6.5 items-center gap-2 py-1">
      <CheckboxLib.Root
        checked={resolvedChecked}
        onCheckedChange={(value) => handleCheckedChange(value === true)}
        className="h-4.5 w-4.5 rounded-xs border border-gray-90 data-[state=checked]:bg-gray-90"
      >
        <CheckboxLib.Indicator className="flex w-full items-center justify-center">
          <CheckIcon className="text-gray-25" />
        </CheckboxLib.Indicator>
      </CheckboxLib.Root>
      <label className="text-label-14-sb flex-1 truncate text-gray-90">{text}</label>
    </div>
  );
}
