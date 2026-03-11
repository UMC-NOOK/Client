import Dim from "../layout/Dim";
import camera from "../../assets/icons/camera-gray.svg";
import close from "../../assets/icons/close.svg";

type ImageProps = {
  imageUrl?: string;
  type: "Upload" | "Skeleton" | "Image" | "Delete";
};

export default function Image({ imageUrl, type }: ImageProps) {
  return (
    <div
      className={`w-26 h-26 relative rounded-xs ${type === "Skeleton" ? "bg-gray-10" : ""} ${type === "Upload" ? "bg-gray-17" : ""}`}
    >
      {type === "Upload" && (
        <img
          src={camera}
          alt="Upload Icon"
          className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {type === "Image" && imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-xs"
        />
      )}
      {type === "Delete" && (
        <>
          <img
            src={imageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-xs"
          />
          <Dim width={"full"} height={"full"} top={0} left={0} />
          <img
            src={close}
            alt="Delete Icon"
            className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </>
      )}
    </div>
  );
}
