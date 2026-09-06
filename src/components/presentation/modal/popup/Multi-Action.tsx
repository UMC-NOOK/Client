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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className={`flex w-77.75 flex-col items-center justify-center gap-5 p-8 bg-gray-17 rounded-lg ${className}`}>
                <div className="text-gray-90 items-center text-body-16-b">
                    {title}
                </div>
                <div className="flex flex-col items-center gap-2">
                    <button 
                        className="flex w-61.75 bg-gray-25 text-gray-70 text-btn-16-sb px-6 py-4 justify-center rounded-lg"
                        onClick={onButton1Click}>
                        {buttonContext1}
                    </button>
                    <button 
                        className="flex w-61.75 bg-gray-25 text-gray-70 text-btn-16-sb px-6 py-4 justify-center rounded-lg"
                        onClick={onButton2Click}>
                        {buttonContext2}
                    </button>
                    <button 
                        className="flex w-61.75 bg-gray-25 text-gray-70 text-btn-16-sb px-6 py-4 justify-center rounded-lg"
                        onClick={onButton3Click}>
                        {buttonContext3}
                    </button>
                </div>
            </div>
        </div>
    )
}