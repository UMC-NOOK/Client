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
        className="w-full text-center">
        <SectionHeader size="13" 
            top={
                active ? (
                    name
                ) : (
                    <span className="text-gray-35">{name}</span>
                )
            } 
            bottom={
                active ? (
                    <span className="text-label-13-r"> {time} </span>
                ) : (
                    <span className="text-gray-35">{time}</span>
                )
            } />
      </div>
    </div>
  );
}