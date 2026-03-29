import * as CheckboxLib from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import React from "react";


type CheckboxProps = {
    text: string;
}

export default function Checkbox ({text} : CheckboxProps) {
    //상태 관리

    const [checked, setChecked] = React.useState(false);

    return(
        <div className="flex items-center py-1 h-[26px] gap-2">
            <CheckboxLib.Root 
                defaultChecked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
                className="w-[18px] h-[18px] border border-gray-90 rounded-[2px] 
                data-[state=checked]:bg-gray-90">
		        <CheckboxLib.Indicator className="flex w-full items-center justify-center">
                    <CheckIcon className="text-gray-25"/>
                </CheckboxLib.Indicator> 
	        </CheckboxLib.Root>
            <label
                className="label-14-sb text-gray-90">
                    {text}
            </label>
        </div>
       
    );
}