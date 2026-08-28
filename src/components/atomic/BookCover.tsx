/*

<BookCover
  size="M"
  type="Image"
  imageUrl="https://via.placeholder.com/150"
/>

<BookCover size="M" type="Upload" />

*/

import camera from "../../assets/icons/camera-gray.svg";

type BookCoverProps = {
  imageUrl?: string;
  size: "XS" | "S" | "M" | "XL";
  type: "Image" | "Upload";
  className?: string;
};

export default function BookCover({
  imageUrl,
  size,
  type,
  className,
}: BookCoverProps) {
  const sizeClasses = {
    XS: "w-11 h-16 rounded-xs",
    S: "w-14 h-20.5 rounded-xs",
    M: "w-25 h-36 rounded-xs",
    XL: "w-40 h-56 rounded-sm",
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gray-17 flex items-center justify-center ${className || ""}`}
    >
      {type === "Image" && imageUrl && (
        <img
          src={imageUrl}
          alt="Book Cover"
          className={`w-full h-full object-cover ${sizeClasses[size]}`}
        />
      )}
      {type === "Upload" && (
        <div className="w-6 h-6 ">
          <img src={camera} alt="Upload Icon" className="" />
        </div>
      )}
    </div>
  );
}
