import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { putUpdateRecord, postImagesUpload } from "../../../api/record";

import type { CreateRecordRequest } from "../../../types/report/creatRcord.type";
import type { ImageUploadResponse } from "../../../types/report/imageUpload.type";

type ImageType = "image/jpeg" | "image/png" | "image/webp";

type EditRecordVariables = {
  recordId: number;
  content: CreateRecordRequest["content"];
  emotion: CreateRecordRequest["emotion"];

  // 기존 이미지: key 문자열
  // 새 이미지: File 객체
  mixedImages: (File | string)[];
};

export function useEditRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recordId,
      content,
      emotion,
      mixedImages,
    }: EditRecordVariables) => {
      /*
       * 새로 업로드할 File만 추출
       */
      const filesToUpload = mixedImages.filter(
        (item): item is File => item instanceof File,
      );

      let newUploadKeys: string[] = [];

      /*
       * 새 이미지가 있을 때만 업로드 URL 발급 및 업로드
       */
      if (filesToUpload.length > 0) {
        const imageTypes: ImageType[] = filesToUpload.map((file) => {
          if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/webp"
          ) {
            return file.type;
          }

          throw new Error(`Unsupported image type: ${file.type}`);
        });

        const uploadImageUrls: ImageUploadResponse[] =
          await postImagesUpload(imageTypes);

        const uploadPromises = filesToUpload.map(async (file, index) => {
          const uploadInfo = uploadImageUrls[index];

          if (!uploadInfo) {
            throw new Error(
              `${index + 1}번째 이미지의 업로드 정보가 없습니다.`,
            );
          }

          const { imageUrl, key } = uploadInfo;

          await axios.put(imageUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });

          return key;
        });

        newUploadKeys = await Promise.all(uploadPromises);
      }

      /*
       * mixedImages 순서를 유지하면서 최종 key 목록 생성
       *
       * string → 기존 이미지 key 유지
       * File   → 새로 업로드한 이미지 key로 교체
       */
      let newKeyIndex = 0;

      const finalImageKeys = mixedImages.map((item) => {
        if (typeof item === "string") {
          return item;
        }

        const uploadedKey = newUploadKeys[newKeyIndex++];

        if (!uploadedKey) {
          throw new Error("새로 업로드한 이미지 key가 없습니다.");
        }

        return uploadedKey;
      });

      /*
       * 혹시 같은 key가 배열에 중복으로 들어온 경우 제거
       * 기존 순서는 그대로 유지됨
       */
      const uniqueFinalImageKeys = [...new Set(finalImageKeys)];

      const body: CreateRecordRequest = {
        content,
        emotion,
        imageKeys: uniqueFinalImageKeys,
      };

      console.log("기존 mixedImages:", mixedImages);
      console.log("새 이미지 key:", newUploadKeys);
      console.log("최종 imageKeys:", uniqueFinalImageKeys);

      return putUpdateRecord(recordId, body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
}
