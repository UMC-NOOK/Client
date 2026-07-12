import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { putUpdateRecord, postImagesUpload } from "../../../api/record";
import type { CreateRecordRequest } from "../../../types/report/creatRcord.type";
import type { ImageUploadResponse } from "../../../types/report/imageUpload.type"; // 타입 경로 확인 필요

export function useEditRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      recordId,
      content,
      emotion,
      mixedImages,
    }: {
      recordId: number;
      content: CreateRecordRequest["content"];
      emotion: CreateRecordRequest["emotion"];
      mixedImages: (File | string)[]; // ["기존키.png", File, File] 형태
    }) => {
      // 섞여있는 배열에서 새로 업로드해야 할 File 객체만 추출
      const filesToUpload = mixedImages.filter(
        (item): item is File => item instanceof File,
      );

      let newUploadKeys: string[] = [];

      // 새로 추가된 사진이 있다면 업로드
      if (filesToUpload.length > 0) {
        let uploadImageUrls: ImageUploadResponse[] = [];
        uploadImageUrls = await postImagesUpload(filesToUpload.length);

        const uploadPromises = filesToUpload.map(async (file, index) => {
          const { imageUrl, key } = uploadImageUrls[index];

          await axios.put(imageUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });

          console.log(`새 이미지 업로드 성공: ${key}`);
          return key;
        });

        newUploadKeys = await Promise.all(uploadPromises);
      }

      // 원래 순서에 맞게 최종 전송용 Key 배열 조립
      let newKeyIndex = 0;
      const finalImageKeys = mixedImages.map((item) => {
        if (item instanceof File) {
          // File이었던 자리는 새로 업로드해서 받아온 Key 삽입
          return newUploadKeys[newKeyIndex++];
        } else {
          // 이미 string(기존 서버에서 줬던 Key)이었던 자리는 그대로 유지
          return item;
        }
      });

      console.log("최종 수정 전송될 이미지 키 목록:", finalImageKeys);

      const body: CreateRecordRequest = {
        content,
        emotion,
        imageKeys: finalImageKeys,
      };

      return putUpdateRecord(recordId, body);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["records"],
      });
    },
  });
}
