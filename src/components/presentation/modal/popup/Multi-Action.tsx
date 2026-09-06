import Solid from "../../../action/Button/Solid";

type Props = {
  title: string;
  buttonContext1: string;
  buttonContext2: string;
  buttonContext3: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
  onButton3Click?: () => void;
  className?: string;
}

export default function MultiAction({
    title,
    buttonContext1,
    buttonContext2,
    buttonContext3,
    onButton1Click,
    onButton2Click,
    onButton3Click,
    className = ""
}: Props){
    return(
        <div className={`flex w-77.75 flex-col items-center justify-center gap-5 p-8 ${className}`}>
            <div className="text-gray-90 items-center text-body-16-b">
                {title}
            </div>
            <div className="items-center gap-2">
                <Solid
                    text={buttonContext1}
                    className="text-gray-70 text-btn-16-sb"
                    size="s"
                    variant = "secondary"
                    onClick={() => {onButton1Click}}
                />
                <Solid
                    text={buttonContext2}
                    className="text-gray-70 text-btn-16-sb"
                    size="s"
                    variant = "secondary"
                    onClick={() => {onButton2Click}}
                />
                 <Solid
                    text={buttonContext3}
                    className="text-gray-70 text-btn-16-sb"
                    size="s"
                    variant = "secondary"
                    onClick={() => {onButton3Click}}
                />
            </div>
        </div>
    )
}