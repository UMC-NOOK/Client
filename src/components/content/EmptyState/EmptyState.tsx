type Props = {
  text: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function EmptyState({
  text,
  buttonText,
  onButtonClick,
}: Props) {
  const hasButton = Boolean(buttonText);

  return (
    <div className="flex w-[343px] items-center justify-center py-24">
      {hasButton ? (
        <div className="flex items-center justify-center">
          <p className="whitespace-nowrap text-label-14-sb text-gray-60">
            {text}
          </p>

          <button
            type="button"
            onClick={onButtonClick}
            className="flex items-center justify-center px-2 py-1 text-label-14-sb text-gray-60 underline"
          >
            {buttonText}
          </button>
        </div>
      ) : (
        <p className="whitespace-nowrap text-center text-label-14-sb text-gray-60">
          {text}
        </p>
      )}
    </div>
  );
}