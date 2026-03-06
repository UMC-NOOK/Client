type BookCoverProps = {
  imageUrl?: string;
  size: "XS" | "S" | "M" | "XL";
  type: "Image" | "Upload";
};

export default function BookCover({ imageUrl, size, type }: BookCoverProps) {
  const sizeClasses = {
    XS: "w-11 h-16",
    S: "w-14 h-[82px]",
    M: "w-25 h-36",
    XL: "w-40 h-56",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xs bg-`}>
      {type === "Image" && imageUrl && (
        <img
          src={imageUrl}
          alt="Book Cover"
          className="w-full h-full object-cover"
        />
      )}
      {type === "Upload" && (
        <div className="w-full h-full flex items-center justify-center bg-gray-80 text-gray-50">
          업로드
        </div>
      )}
    </div>
  );
}
