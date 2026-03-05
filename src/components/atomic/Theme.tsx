/*
<Theme
  imageUrl=""
  select={select}
  onClick={() => setSelect(!select)}
/>
*/

type ThemeProps = {
  imageUrl: string;
  select: boolean;
  onClick: () => void;
};

export default function Theme({ imageUrl, select, onClick }: ThemeProps) {
  return (
    <div className="w-20 h-20 " onClick={onClick}>
      <img
        src={imageUrl}
        alt="Theme"
        className={
          `rounded-md  w-full h-full object-cover` +
          (select
            ? "outline-1 outline-gray-90 outline-solid"
            : "w-full h-full opacity-50")
        }
      />
    </div>
  );
}
