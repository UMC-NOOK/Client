import defaultProfile from "../../../assets/icons/Profile Image.svg";

// 업로드 API가 지원하는 PNG로 기본 SVG 프로필을 변환한다.
export async function createDefaultProfileFile(): Promise<File> {
  const image = new Image();
  image.src = defaultProfile;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("기본 프로필 이미지를 준비하지 못했어요.");
  context.drawImage(image, 0, 0);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((result) => {
      if (result) resolve(result);
      else reject(new Error("기본 프로필 이미지를 변환하지 못했어요."));
    }, "image/png");
  });

  return new File([blob], "default-profile.png", { type: "image/png" });
}
