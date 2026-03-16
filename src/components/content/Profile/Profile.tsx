import SectionHeader from "../InformationText/SectionHeader";

type Props = {
  active?: boolean;
  imageUrl: string;
  name: string;
  time: string;
};

export default function Profile({
  active = true,
  imageUrl,
  name,
  time,
}: Props) {
  return (
    <div className="flex w-26 flex-col items-center gap-3">
      <div
        className={["h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat",
          active ? "opacity-100" : "opacity-50",
        ].join(" ")}
        style={{ backgroundImage: `url(${imageUrl})` }}
        aria-label={`${name} profile image`}
      />

      <div
        className={["w-fullitems-center text-center",
          "[&_p:last-child]:!text-label-13-sb",
          active
            ? "[_p:first-child]:!&text-gray-90 [&_p:last-child]:!text-gray-50"
            : "[&_p:first-child]:!text-gray-50 [&_p:last-child]:!text-gray-50",
        ].join(" ")}
      >
        <SectionHeader size="13" top={name} bottom={time} />
      </div>
    </div>
  );
}