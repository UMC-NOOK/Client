type SnackbarProps = {
  icon?: string;
  text: string;
  buttonText: string;
  onButtonClick: () => void;
};

export default function Snackbar({
  icon,
  text,
  buttonText,
  onButtonClick,
}: SnackbarProps) {
  return (
    <div className="w-full h-[46px] py-3 px-4 flex items-center gap-2 bg-gray-90 rounded-lg absolute bottom-4 z-100">
      {icon && (
        <img src={icon} alt="Icon" className="w-5 h-5 inline-block shrink-0" />
      )}

      <span className="flex-1 text-left text-btn-14-sb text-gray-25">
        {text}
      </span>

      <button
        onClick={onButtonClick}
        className="shrink-0 whitespace-nowrap bg-transparent text-gray-60 text-btn-14-sb px-2 py-1"
      >
        {buttonText}
      </button>
    </div>
  );
}
