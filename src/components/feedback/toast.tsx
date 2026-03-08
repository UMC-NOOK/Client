type ToastProps = {
  icon?: string;
  text: string;
};

export default function Toast({ icon, text }: ToastProps) {
  return (
    <div className="w-full h-11 py-3 px-4 flex items-center gap-2 bg-gray-90 rounded-lg">
      {icon && (
        <img src={icon} alt="Icon" className="w-5 h-5 inline-block shrink-0" />
      )}

      <span className="flex-1 text-left text-btn-14-sb text-gray-25">
        {text}
      </span>
    </div>
  );
}
