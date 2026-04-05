type Props = {
  text: string;
  disable?: boolean;
};

export default function Day({
  text,
  disable = true,
}: Props) {
  return (
    <div className="inline-flex flex-col items-center justify-center px-2 py-1">
      <span className={["w-6 whitespace-nowrap text-center text-label-13-sb",
          disable ? "text-gray-40" : "text-gray-90",
        ].join(" ")}>
        {text}
      </span>
    </div>
  );
}